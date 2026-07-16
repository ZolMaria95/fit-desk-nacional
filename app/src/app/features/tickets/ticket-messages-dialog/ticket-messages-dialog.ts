import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/services/auth.service';
import { HelpdeskService } from '../../../core/services/helpdesk.service';
import { ComposeDialog } from '../compose-dialog/compose-dialog';
import { EMPLEADOS } from '../helpdesk.constants';
import { Ticket, clipboardToHtml, editorToMessageHtml, insertCodeBlock, mapTicket, safeHtml, stripHtml } from '../ticket-utils';
import { estadoStyle } from '../tickets-card-utils';

interface ConvMsg {
  /** id del mensaje (ObjectId del API); vacío si el API no lo trajo. */
  id: string;
  autor: string;
  tipo: 'sys' | 'emp' | 'cli';
  fecha: string;
  html: SafeHtml | null;
  /** Detalle original saneado SIN hidratar imágenes: se recarga en el composer al editar. */
  rawHtml: string;
  /** `can_edit` del API: el servidor ya resolvió ventana de 10 min + "solo el autor". */
  canEdit: boolean;
  adjuntos: { id: string; nombre: string }[];
}

export interface TicketMessagesData {
  /** Número de ticket. Alternativa a pasar el objeto Ticket completo. */
  ticketId?: string;
  /** Ticket completo (si el llamador lo tiene, evita una consulta para el header). */
  ticket?: Ticket;
}

/** Conversación completa de un ticket: mensajes, adjuntos, lightbox y composer. */
@Component({
  selector: 'app-ticket-messages-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatTooltipModule],
  templateUrl: './ticket-messages-dialog.html',
  styleUrl: './ticket-messages-dialog.scss',
})
export class TicketMessagesDialog {
  private readonly hd = inject(HelpdeskService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialogRef = inject(MatDialogRef<TicketMessagesDialog>);
  private readonly dialog = inject(MatDialog);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly snack = inject(MatSnackBar);
  private readonly data = inject<TicketMessagesData>(MAT_DIALOG_DATA);

  readonly ticketId = this.data.ticketId || this.data.ticket?.ticket || '';
  readonly estadoStyle = estadoStyle;
  private ticketObj: Ticket | null = this.data.ticket ?? null;
  readonly header = signal({
    cliente: this.data.ticket?.clienteRaw || '',
    tipo: this.data.ticket?.tipo || '',
    estatus: this.data.ticket?.estatus || '',
    asunto: this.data.ticket?.asunto || '',
  });
  readonly loading = signal(true);
  readonly sessionExpired = signal(false);
  readonly messages = signal<ConvMsg[]>([]);
  readonly ticketAttachments = signal<string[]>([]);
  readonly lightbox = signal<string | null>(null);

  // Paginación de mensajes: se procesa/hidrata solo el bloque más reciente y los
  // anteriores se cargan bajo demanda (no todo junto). `cursor` = índice del más
  // viejo ya mostrado dentro de `sortedRaw` (orden ascendente por fecha).
  private static readonly CHUNK = 15;
  readonly hasOlder = signal(false);
  readonly loadingOlder = signal(false);
  private sortedRaw: any[] = [];
  private cursor = 0;
  // N° de secuencia global de cada adjunto (id → N), en orden cronológico.
  private adjNumById = new Map<string, number>();

  // Editor de respuesta con formato (contenteditable): escribir/pegar/dar
  // formato aquí ya viaja como HTML, así el mensaje conserva el formato.
  readonly composerInput = viewChild.required<ElementRef<HTMLElement>>('composerInput');
  composerFiles: File[] = [];
  readonly sending = signal(false);
  readonly sendStatus = signal('');
  // Edición de un mensaje propio (reusa el composer): id del mensaje en edición o null.
  readonly editingId = signal<string | null>(null);
  // Resaltado del área de mensaje mientras se arrastran archivos encima.
  readonly dragOver = signal(false);

  constructor() {
    this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    // Verifica la sesión antes de pedir nada: si expiró, las llamadas HD_SAFE
    // devolverían vacío ("Sin mensajes") en vez de avisar. Mejor pedir re-login.
    if (!(await this.auth.verifySession())) {
      this.sessionExpired.set(true);
      this.loading.set(false);
      return;
    }
    // Si no vino el ticket completo (p. ej. abierto desde la card), trae el header.
    if (!this.ticketObj && this.ticketId) {
      const raw = await this.hd.fetchTicketRaw(this.ticketId);
      if (raw) {
        this.ticketObj = mapTicket(raw);
        this.header.set({
          cliente: this.ticketObj.clienteRaw,
          tipo: this.ticketObj.tipo,
          estatus: this.ticketObj.estatus,
          asunto: this.ticketObj.asunto,
        });
      }
    }
    const msgs = await this.hd.fetchMessages(this.ticketId);
    this.sortedRaw = [...msgs].sort(
      (a, b) => new Date(a.entry_date || 0).getTime() - new Date(b.entry_date || 0).getTime(),
    );
    // N° de secuencia GLOBAL por adjunto, en orden cronológico → el nombre lleva ese
    // N: adjunto_<ticket>-<N>. Estable aunque los bloques se carguen por partes.
    this.adjNumById = new Map<string, number>();
    let adjNum = 0;
    for (const m of this.sortedRaw) {
      const ids: any[] = [];
      if (m.attach_id) ids.push(m.attach_id);
      if (Array.isArray(m.attach_ids)) ids.push(...m.attach_ids);
      for (const id of ids) {
        const s = String(id);
        if (id && !this.adjNumById.has(s)) this.adjNumById.set(s, ++adjNum);
      }
    }
    this.cursor = this.sortedRaw.length;
    this.messages.set([]);
    this.loading.set(false);
    // Muestra el bloque más reciente; los anteriores se cargan bajo demanda.
    await this.loadOlder();
    // Adjunto a nivel ticket (no de un mensaje) → botón de descarga.
    if (this.ticketObj) this.hd.ticketAttachmentIds(this.ticketObj).then((ids) => this.ticketAttachments.set(ids));
  }

  /** Procesa (e hidrata imágenes de) el bloque inmediatamente anterior y lo antepone. */
  async loadOlder(): Promise<void> {
    if (this.loadingOlder() || this.cursor <= 0) return;
    this.loadingOlder.set(true);
    const start = Math.max(0, this.cursor - TicketMessagesDialog.CHUNK);
    const slice = this.sortedRaw.slice(start, this.cursor);
    const procesados = (await Promise.all(slice.map((m) => this.procesar(m)))).filter(
      (m): m is ConvMsg => !!m,
    );
    this.messages.set([...procesados, ...this.messages()]);
    this.cursor = start;
    this.hasOlder.set(this.cursor > 0);
    this.loadingOlder.set(false);
  }

  /** Cierra la conversación y va al login (sesión expirada). */
  goToLogin(): void {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  private esEmpleado(m: any): boolean {
    const role = String(m.entry_user_role || '').trim().toUpperCase();
    if (role) return !role.includes('CLIENTE');
    return EMPLEADOS.has(String(m.entry_user_id || '').trim().toUpperCase());
  }

  private attachsDeMensaje(m: any): { id: string; nombre: string }[] {
    const ids: any[] = [];
    if (m.attach_id) ids.push(m.attach_id);
    if (Array.isArray(m.attach_ids)) ids.push(...m.attach_ids);
    const seen = new Set<string>();
    const unicos: string[] = [];
    ids.forEach((id) => {
      const s = String(id);
      if (id && !seen.has(s)) { seen.add(s); unicos.push(s); }
    });
    // Cada adjunto: adjunto_<ticket>-<N° de secuencia global>. La extensión real
    // se añade al descargar (Content-Disposition).
    return unicos.map((id) => ({ id, nombre: `adjunto_${this.ticketId}-${this.adjNumById.get(id) ?? 1}` }));
  }

  /** Reemplaza el src de las imágenes embebidas por blob URLs con auth. */
  private async hidratarImgs(html: string): Promise<string> {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const imgs = [...doc.querySelectorAll('img[src]')];
    for (const img of imgs) {
      const src = img.getAttribute('src') || '';
      const m = /attachments\/(\d+)/.exec(src);
      if (m) {
        const url = await this.hd.attachmentUrl(m[1]);
        if (url) img.setAttribute('src', url);
      }
    }
    return doc.body.innerHTML;
  }

  private async procesar(m: any): Promise<ConvMsg | null> {
    const esSys = m.system_message === true;
    let html = safeHtml(m.detail || '');
    // HTML original (sin hidratar imágenes) para recargarlo tal cual en el composer al editar.
    const rawHtml = html;
    const texto = stripHtml(html).trim();
    const adjuntos = this.attachsDeMensaje(m);
    if (!texto && !html.includes('<img') && !adjuntos.length) return null;
    if (html.includes('<img')) html = await this.hidratarImgs(html);
    return {
      id: String(m.id || ''),
      // Nombre completo para identificar fácil; el código (entry_user_id) es el fallback.
      autor: esSys ? 'Sistema' : m.entry_user_name || m.entry_user_id || '—',
      tipo: esSys ? 'sys' : this.esEmpleado(m) ? 'emp' : 'cli',
      fecha: m.entry_date ? String(m.entry_date).replace('T', ' ').slice(0, 16) : '',
      html: texto || html.includes('<img') ? this.sanitizer.bypassSecurityTrustHtml(html) : null,
      rawHtml,
      // El servidor decide (ventana de 10 min + solo el autor); no se recalcula en el cliente.
      canEdit: m.can_edit === true,
      adjuntos,
    };
  }

  onConvClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const src = (target as HTMLImageElement).src;
      if (src) this.lightbox.set(src);
    }
  }

  async openAttachment(id: string, nombre: string): Promise<void> {
    const res = await this.hd.fetchAttachment(id);
    if (!res) {
      this.snack.open('No se pudo abrir el adjunto.', 'OK', { duration: 3000 });
      return;
    }
    const a = document.createElement('a');
    a.href = res.url;
    // Nombre con nuestra convención + la extensión real del header (para que abra bien).
    const ext = (res.filename.match(/\.[^.\s]+$/) || [''])[0];
    a.download = nombre ? `${nombre}${nombre.endsWith(ext) ? '' : ext}` : res.filename || `adjunto_${this.ticketId}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(res.url), 10000);
  }

  onFiles(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.composerFiles = input.files ? [...input.files] : [];
  }

  /** Quita un adjunto de la lista (botón ✕ junto al archivo). */
  removeFile(file: File): void {
    this.composerFiles = this.composerFiles.filter((f) => f !== file);
  }

  // ── Arrastrar y soltar archivos sobre el área de mensaje ──
  // Solo intercepta cuando lo arrastrado son archivos; el texto arrastrado
  // sigue su curso normal hacia el editor.
  private hasFiles(e: DragEvent): boolean {
    return !!e.dataTransfer && [...e.dataTransfer.types].includes('Files');
  }

  onDragOver(e: DragEvent): void {
    if (this.sending() || !this.hasFiles(e)) return;
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'copy';
    this.dragOver.set(true);
  }

  onDragLeave(e: DragEvent): void {
    // Ignora el "leave" hacia un hijo del propio contenedor (evita parpadeo).
    const to = e.relatedTarget as Node | null;
    if (to && e.currentTarget instanceof Node && e.currentTarget.contains(to)) return;
    this.dragOver.set(false);
  }

  onDrop(e: DragEvent): void {
    if (!this.hasFiles(e)) return;
    e.preventDefault();
    this.dragOver.set(false);
    if (this.sending()) return;
    const dropped = e.dataTransfer?.files ? [...e.dataTransfer.files] : [];
    if (dropped.length) this.composerFiles = [...this.composerFiles, ...dropped];
  }

  /** Aplica negrita/cursiva/subrayado a la selección del editor inline. */
  format(cmd: 'bold' | 'italic' | 'underline'): void {
    this.composerInput().nativeElement.focus();
    document.execCommand(cmd, false);
  }

  /** Marca la selección como bloque de código (monoespaciado, conserva sangría). */
  codeBlock(): void {
    insertCodeBlock(this.composerInput().nativeElement);
  }

  /**
   * Al pegar, inserta HTML saneado (conserva formato, descarta el ruido que el
   * backend tiraba y publicaba el mensaje vacío). Sin esto se pegaba el HTML
   * crudo del portapapeles.
   */
  onPaste(e: ClipboardEvent): void {
    const data = e.clipboardData;
    if (!data) return;
    e.preventDefault();
    const limpio = clipboardToHtml(data.getData('text/html'), data.getData('text/plain'));
    document.execCommand('insertHTML', false, limpio);
  }

  /** Abre el editor en un pop-up amplio con el contenido actual y lo devuelve al cerrar. */
  async openComposer(): Promise<void> {
    const el = this.composerInput().nativeElement;
    const html = await firstValueFrom(
      this.dialog
        .open(ComposeDialog, {
          data: { html: el.innerHTML },
          width: '720px',
          maxWidth: '95vw',
          autoFocus: false,
        })
        .afterClosed(),
    );
    if (html === undefined) return; // cancelado
    el.innerHTML = html;
    el.focus();
  }

  /** Carga el mensaje propio en el composer para editarlo (solo texto). */
  startEdit(m: ConvMsg): void {
    if (!m.canEdit || !m.id) return;
    const el = this.composerInput().nativeElement;
    el.innerHTML = m.rawHtml; // detalle original (sin imágenes hidratadas)
    this.editingId.set(m.id);
    this.sendStatus.set('');
    el.focus();
  }

  /** Cancela la edición en curso y limpia el composer. */
  cancelEdit(): void {
    this.editingId.set(null);
    this.composerInput().nativeElement.innerHTML = '';
    this.sendStatus.set('');
  }

  async send(): Promise<void> {
    const el = this.composerInput().nativeElement;
    // Serializa el contenteditable conservando saltos de línea (bloques y \n → <br>).
    const detail = editorToMessageHtml(el);
    const vacio = !el.textContent?.trim() && !el.querySelector('img');
    const editing = this.editingId();

    // ── Editar un mensaje propio (solo texto): PATCH nativo del API ──
    if (editing) {
      if (vacio) {
        this.sendStatus.set('El mensaje no puede quedar vacío.');
        return;
      }
      this.sending.set(true);
      this.sendStatus.set('Guardando…');
      const res = await this.hd.editMessage(this.ticketId, editing, detail);
      this.sending.set(false);
      if (res.ok) {
        el.innerHTML = '';
        this.editingId.set(null);
        this.sendStatus.set('Guardado ✓');
        this.load();
      } else {
        // Muestra el motivo real del API (fuera de ventana / ajeno) sin descartar lo tipeado.
        this.sendStatus.set(res.error || 'No se pudo editar el mensaje.');
      }
      return;
    }

    // ── Enviar un mensaje nuevo ──
    if (vacio && !this.composerFiles.length) {
      this.sendStatus.set('Escribe un mensaje o adjunta un archivo.');
      return;
    }
    this.sending.set(true);
    this.sendStatus.set('Enviando...');
    const ok = await this.hd.sendMessage(this.ticketId, detail, this.composerFiles);
    this.sending.set(false);
    if (ok) {
      el.innerHTML = '';
      this.composerFiles = [];
      this.sendStatus.set('Enviado ✓');
      this.load();
    } else {
      this.sendStatus.set('Error al enviar.');
    }
  }
}
