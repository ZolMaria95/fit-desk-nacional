import { Component, ElementRef, OnDestroy, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { wireDialogEsc } from '../../../core/dialog-esc';
import { clearDraft, loadDraft, saveDraft } from '../../../core/draft-store';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/services/auth.service';
import { HelpdeskService } from '../../../core/services/helpdesk.service';
import { ComposeDialog } from '../compose-dialog/compose-dialog';
import { EMPLEADOS } from '../helpdesk.constants';
import { Ticket, clipboardToHtml, editorToMessageHtml, insertCodeBlock, mapTicket, safeHtml, stripHtml } from '../ticket-utils';
import { estadoStyle, fmtIngreso, fmtMod } from '../tickets-card-utils';
import { prioBadgeClase } from '../../board/board-utils';
import { esSoloLectura } from '../../../core/helpdesk-estados';
import { AssignTicketDialog } from '../assign-ticket-dialog/assign-ticket-dialog';

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
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatTooltipModule],
  templateUrl: './ticket-messages-dialog.html',
  styleUrl: './ticket-messages-dialog.scss',
  host: { '[class.reader-expanded]': 'readerExpanded()' },
})
export class TicketMessagesDialog implements OnDestroy {
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
  readonly prioClase = prioBadgeClase;
  private ticketObj: Ticket | null = this.data.ticket ?? null;
  readonly header = signal(this.headerFrom(this.data.ticket ?? null));

  /** Construye el encabezado desde el Ticket. Regla #8: `creador` usa el NOMBRE
   *  (`nombreIngreso`), nunca el código (`usuarioIngreso`). */
  private headerFrom(t: Ticket | null) {
    return {
      cliente: t?.clienteRaw || '',
      tipo: t?.tipo || '',
      estatus: t?.estatus || '',
      asunto: t?.asunto || '',
      orden: t?.orden ?? 999,
      fecha: t?.fechaIngreso ? fmtIngreso(t.fechaIngreso) : '',
      // Última modificación (mismo formateo que la tarjeta de la lista).
      fechaMod: t?.fechaMod ? fmtMod(t.fechaMod) : '',
      creador: t?.nombreIngreso || '',
      // Asignado actual (nombre; nunca el código — regla #8). '' → "Sin asignar".
      asignado: t?.nombreAsignado || '',
    };
  }
  readonly loading = signal(true);
  readonly sessionExpired = signal(false);
  // Cambio de estado del ticket desde el propio diálogo (acción explícita del usuario;
  // "abrir no escribe" se respeta: solo escribe al elegir un estado del menú). Reusa
  // el catálogo y el mismo endpoint que la lista de Tickets.
  readonly statusOptions = computed(() => this.hd.statusNames().filter((s) => s.trim().toUpperCase() !== 'ABIERTO'));
  readonly changingStatus = signal(false);
  // Ticket en estado terminal (Aprobado/Cerrado/Cotización rechazada): solo lectura.
  // No se puede responder ni asignar; cambiar de estado queda solo para Responsable/Admin.
  readonly soloLectura = computed(() => esSoloLectura(this.header().estatus));
  readonly puedeEstadoTerminal = computed(() => this.auth.puedeTransferir());
  readonly asignando = signal(false);
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
  /** Lectura ampliada: la conversación ocupa TODO el modal (oculta resumen y composer)
   *  para ver más mensajes. El botón de "volver" del encabezado la desactiva. El composer
   *  se oculta por CSS (no se quita del DOM) → no se pierde el borrador ni la edición. */
  readonly readerExpanded = signal(false);

  // ── Borrador automático del mensaje en curso (solo mensaje NUEVO, no ediciones) ──
  /** Clave del borrador por ticket. */
  private readonly draftKey = 'msg_' + this.ticketId;
  /** Último HTML del composer (cacheado en cada input) para poder re-guardarlo al cerrar
   *  sin depender del DOM (que ya puede estar destruido en ngOnDestroy). Se vacía al enviar. */
  private lastComposerHtml = '';
  /** Debounce manual del autoguardado (mismo patrón que streamDebounce en DataService). */
  private draftTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.load();
    // ESC jerárquico: cierra primero el visor de imagen, luego la lectura ampliada, y solo
    // si no hay nada propio en primer plano cierra el modal. Los popups del CDK (menú de
    // estado, diálogos anidados) los resuelve el propio helper (overlay superior).
    wireDialogEsc(this.dialogRef, () => {
      if (this.lightbox()) { this.lightbox.set(null); return true; }
      if (this.readerExpanded()) { this.readerExpanded.set(false); return true; }
      return false;
    });
    // Restaura el borrador vigente (< 90 s) tras el primer render (el composer ya existe).
    afterNextRender(() => {
      // Sin composer en el DOM (solo lectura / sesión expirada) o editando → no restaurar.
      if (this.editingId() || this.soloLectura() || this.sessionExpired()) return;
      const html = loadDraft(this.draftKey);
      if (!html) return;
      const el = this.composerInput().nativeElement;
      if (el.textContent?.trim() || el.querySelector('img')) return; // ya hay algo escrito
      el.innerHTML = html;
      this.lastComposerHtml = html;
      this.snack.open('Se restauró tu borrador.', 'OK', { duration: 3500 });
    });
  }

  ngOnDestroy(): void {
    if (this.draftTimer) clearTimeout(this.draftTimer);
    // Cierre sin envío: conserva el borrador 90 s DESDE el cierre (re-estampa la marca).
    // Solo texto: los adjuntos (File) no se pueden serializar. Tras un envío exitoso
    // `lastComposerHtml` quedó en '' → no se re-guarda nada.
    if (!this.editingId() && this.hasText(this.lastComposerHtml)) {
      saveDraft(this.draftKey, this.lastComposerHtml);
    }
  }

  /** Descarta el borrador (envío exitoso): borra la clave y limpia el estado cacheado. */
  private discardDraft(): void {
    if (this.draftTimer) { clearTimeout(this.draftTimer); this.draftTimer = null; }
    this.lastComposerHtml = '';
    clearDraft(this.draftKey);
  }

  /** ¿El HTML tiene texto real o una imagen? (composer "no vacío"). */
  private hasText(html: string): boolean {
    if (!html) return false;
    if (html.includes('<img')) return true;
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return !!tmp.textContent?.trim();
  }

  /** Autoguardado del composer mientras se escribe (debounce 500 ms). No guarda en edición. */
  onComposerInput(): void {
    if (this.editingId()) return;
    this.lastComposerHtml = this.composerInput().nativeElement.innerHTML;
    if (this.draftTimer) clearTimeout(this.draftTimer);
    this.draftTimer = setTimeout(() => {
      if (this.hasText(this.lastComposerHtml)) saveDraft(this.draftKey, this.lastComposerHtml);
      else clearDraft(this.draftKey); // el usuario borró todo → no dejar borrador vacío
    }, 500);
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
        this.header.set(this.headerFrom(this.ticketObj));
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
    // Limpia la sesión ANTES de navegar: si quedó una sesión sin token válido,
    // `isAuthenticated()` seguía en true y el login rebotaba a /tickets (el botón
    // "Iniciar sesión" no llevaba a ningún lado).
    this.auth.clearSession();
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  /** Cambia el estado del ticket en el HelpDesk sin cerrar el diálogo (acción explícita). */
  async changeStatus(nuevo: string): Promise<void> {
    if (this.changingStatus() || nuevo === this.header().estatus) return;
    this.changingStatus.set(true);
    const ok = await this.hd.setTicketStatus(this.ticketId, nuevo);
    this.changingStatus.set(false);
    if (ok) {
      this.header.update((h) => ({ ...h, estatus: nuevo }));
      this.snack.open(`Ticket #${this.ticketId} → ${nuevo}`, '', { duration: 2500 });
    } else {
      this.snack.open(`No se pudo cambiar el estado del ticket #${this.ticketId}.`, 'OK', { duration: 4000 });
    }
  }

  /** Abre el modal de asignación (reusa AssignTicketDialog) y refresca el header al asignar. */
  async cambiarAsignado(): Promise<void> {
    if (this.soloLectura() || this.asignando() || !this.ticketObj) return;
    this.asignando.set(true);
    const ok = await firstValueFrom(
      this.dialog
        .open(AssignTicketDialog, { data: { ticket: this.ticketObj }, width: '480px', maxWidth: '95vw', autoFocus: false })
        .afterClosed(),
    );
    this.asignando.set(false);
    if (!ok) return; // cancelado
    // Recarga el header para reflejar el nuevo asignado (el propio modal ya avisó por snackbar).
    const raw = await this.hd.fetchTicketRaw(this.ticketId);
    if (raw) {
      this.ticketObj = mapTicket(raw);
      this.header.set(this.headerFrom(this.ticketObj));
    }
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
    this.revokeAllPreviews(); // el input reemplaza la lista → libera previews viejos
    this.composerFiles = input.files ? [...input.files] : [];
  }

  /** Abre el lightbox con un adjunto imagen del compositor (antes de enviar), para
   *  verificar que se cargó el archivo correcto. No aplica a adjuntos no-imagen. */
  openFilePreview(f: File): void {
    const u = this.previewUrl(f);
    if (u) this.lightbox.set(u);
  }

  /** Quita un adjunto de la lista (botón ✕ junto al archivo). */
  removeFile(file: File): void {
    this.revokePreview(file);
    this.composerFiles = this.composerFiles.filter((f) => f !== file);
  }

  // ── Previsualización de adjuntos imagen (antes de enviar) ──
  // URLs de objeto cacheadas por File; se revocan al quitar el archivo o tras enviar.
  private previewUrls = new Map<File, string>();

  /** URL para previsualizar un adjunto imagen (o '' si el archivo no es imagen). */
  previewUrl(f: File): string {
    if (!f.type.startsWith('image/')) return '';
    let u = this.previewUrls.get(f);
    if (!u) {
      u = URL.createObjectURL(f);
      this.previewUrls.set(f, u);
    }
    return u;
  }

  private revokePreview(f: File): void {
    const u = this.previewUrls.get(f);
    if (u) {
      URL.revokeObjectURL(u);
      this.previewUrls.delete(f);
    }
  }

  private revokeAllPreviews(): void {
    this.previewUrls.forEach((u) => URL.revokeObjectURL(u));
    this.previewUrls.clear();
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

  /** Quita el formato (negrita/cursiva/subrayado/etc.) del texto seleccionado. */
  removeFormat(): void {
    this.composerInput().nativeElement.focus();
    document.execCommand('removeFormat', false);
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
    this.onComposerInput(); // asignar innerHTML por código no dispara (input) → persistir aquí
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
      this.revokeAllPreviews();
      this.composerFiles = [];
      this.sendStatus.set('Enviado ✓');
      // Envío exitoso → descartar el borrador (regla: se borra solo al enviar o tras 90 s).
      this.discardDraft();
      this.load();
    } else {
      this.sendStatus.set('Error al enviar.');
    }
  }
}
