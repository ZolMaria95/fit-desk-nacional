import { Component, ElementRef, Injector, OnDestroy, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { wireDialogEsc } from '../../../core/dialog-esc';
import { clearDraft, loadDraft, saveDraft } from '../../../core/draft-store';
import { copyText } from '../../../core/clipboard';
import { descargarUrl } from '../../../core/descargar';
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
import { ColoresService } from '../../../core/services/colores.service';
import { HelpdeskService } from '../../../core/services/helpdesk.service';
import { ComposeDialog } from '../compose-dialog/compose-dialog';
import { EMPLEADOS } from '../helpdesk.constants';
import { Ticket, clipboardToHtml, editorToMessageHtml, extFromBytes, extFromMime, htmlToText, insertCodeBlock, mapTicket, safeHtml, stripHtml } from '../ticket-utils';
import { estadoStyle, fmtIngreso, fmtMod } from '../tickets-card-utils';
import { prioBadgeClase } from '../../board/board-utils';
import { esSoloLectura } from '../../../core/helpdesk-estados';
import { AssignTicketDialog } from '../assign-ticket-dialog/assign-ticket-dialog';
import { TicketTitleDialog } from '../ticket-title-dialog/ticket-title-dialog';

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
  /** `entry_user_id` del autor — solo para EMPLEADOS (`undefined` en cliente/Sistema). Habilita el
   *  color identificativo del avatar (`ColoresService`, el mismo que usan Board/Vacaciones/Semanal);
   *  sin `hid` el avatar es gris neutro. */
  hid?: string;
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
  host: {
    '[class.reader-expanded]': 'readerExpanded()',
    // En celular, el panel de badges/metadatos expandido es mucho más alto que la franja
    // compacta de escritorio (apilado en filas, no una sola línea) — esta clase en `:host`
    // (no en `.conv-header`, que es hermano de `.composer`: una custom property de CSS solo
    // desciende, no cruza hermanos) habilita, vía media query, un tope de alto MAYOR para
    // `.conv-header` y recalcula en conjunto el de `.composer`, así ninguno de los dos usa
    // un presupuesto de alto que ya no corresponde a lo que se ve en pantalla.
    '[class.panel-open]': 'resumenExpandido()',
  },
})
export class TicketMessagesDialog implements OnDestroy {
  private readonly hd = inject(HelpdeskService);
  private readonly auth = inject(AuthService);
  private readonly colores = inject(ColoresService);
  private readonly router = inject(Router);
  private readonly dialogRef = inject(MatDialogRef<TicketMessagesDialog>);
  private readonly dialog = inject(MatDialog);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly snack = inject(MatSnackBar);
  private readonly data = inject<TicketMessagesData>(MAT_DIALOG_DATA);

  readonly ticketId = this.data.ticketId || this.data.ticket?.ticket || '';
  readonly estadoStyle = estadoStyle;
  readonly prioClase = prioBadgeClase;

  /** `{bg, fg}` del avatar de un mensaje: color identificativo real si es empleado (mismo que
   *  Board/Vacaciones/Semanal), gris neutro si es cliente/Sistema (`avatar('')` ya cae ahí solo). */
  avatarDe(m: { hid?: string }): { bg: string; fg: string } {
    return this.colores.avatar(m.hid || '');
  }
  /** Iniciales (hasta 2) de un nombre completo, para el avatar del mensaje. */
  iniciales(nombre: string): string {
    const partes = String(nombre || '').trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return '?';
    return (partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : '')).toUpperCase();
  }
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
  /** Exportando la conversación a PDF (evita doble click mientras se genera). */
  readonly descargandoPdf = signal(false);

  /** Info resuelta de cada adjunto (por id): si es imagen + su blob URL (reutilizado para el
   *  thumbnail, el lightbox y la descarga). El endpoint `/attachments/{id}` solo devuelve el blob,
   *  así que el tipo se conoce al bajarlo → se resuelve PROGRESIVAMENTE al cargar los mensajes
   *  (mismo patrón que la hidratación de imágenes embebidas), sin bloquear el render. */
  readonly attachInfo = signal<Record<string, { isImage: boolean; url: string; filename: string; type: string }>>({});
  /** ids de adjunto ya pedidos (evita bajar dos veces el mismo blob). */
  private adjPedidos = new Set<string>();

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

  // ── Scroll de la conversación: abre mostrando el ÚLTIMO mensaje ──
  // Los mensajes van de viejo (arriba) a nuevo (abajo); antes el modal quedaba arriba y había que
  // bajar a mano. `pegadoAlFondo` mantiene la vista abajo mientras cargan imágenes tarde, pero se
  // suelta en cuanto el usuario sube a leer (no se lo vuelve a bajar a la fuerza).
  private readonly convBody = viewChild<ElementRef<HTMLElement>>('convBody');
  private readonly injector = inject(Injector);
  private pegadoAlFondo = true;
  private escuchaCargas: HTMLElement | null = null;
  private readonly onMediaCargada = () => {
    if (this.anclaLectura) this.reubicarAncla();
    else if (this.pegadoAlFondo) this.scrollAlFinalYa();
  };
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
  /** Resumen del ticket colapsado (solo aplica en celular, por CSS — ver `.conv-summary` en el
   *  scss): arranca colapsado, mostrando solo N° de ticket + asunto + cliente, para darle más
   *  espacio a la conversación. El botón "ver más" lo despliega. */
  readonly resumenExpandido = signal(false);
  /** Fila de formato del compositor (negrita/cursiva/subrayado/código/limpiar formato + ampliar
   *  lectura + abrir editor ampliado): colapsada por defecto para que el compositor sea una sola
   *  fila (pastilla) — el botón "Aa" la despliega/repliega. */
  readonly formatBarExpanded = signal(false);

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
    this.escuchaCargas?.removeEventListener('load', this.onMediaCargada, true);
    this.revokeAttachBlobs(); // libera los blob URLs de los adjuntos
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
    this.revokeAttachBlobs(); // recarga: libera blobs de adjuntos anteriores antes de reconstruir
    this.messages.set([]);
    this.loading.set(false);
    // Muestra el bloque más reciente; los anteriores se cargan bajo demanda.
    await this.loadOlder();
    // Abre (o reabre tras enviar/editar, que vuelven a llamar a load) mostrando el último mensaje.
    this.pegadoAlFondo = true;
    this.anclaLectura = null;
    this.scrollAlFinal();
    // Adjunto a nivel ticket (no de un mensaje) → thumbnail si es imagen, si no botón de descarga.
    if (this.ticketObj) this.hd.ticketAttachmentIds(this.ticketObj).then((ids) => {
      this.ticketAttachments.set(ids);
      for (const id of ids) void this.resolverAdjunto(id);
    });
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
    // Resuelve (progresivo) los adjuntos del bloque recién cargado → los que sean imagen se pintan
    // como thumbnail; los demás siguen como chip. No bloquea el render.
    for (const msg of procesados) for (const a of msg.adjuntos) void this.resolverAdjunto(a.id);
  }

  /** Botón "Ver mensajes anteriores": antepone el bloque previo SIN mover lo que el usuario está
   *  leyendo (compensa el alto agregado arriba). */
  async verAnteriores(): Promise<void> {
    const el = this.convBody()?.nativeElement;
    if (!el) { await this.loadOlder(); return; }
    // Ancla: el primer mensaje visible hoy. Tras anteponer el bloque (y mientras sus imágenes
    // terminan de cargar y lo hacen crecer) se lo mantiene en el mismo lugar de la pantalla.
    const antes = this.mensajesDom(el);
    const ancla = antes[0];
    const offset = ancla ? ancla.getBoundingClientRect().top - el.getBoundingClientRect().top : 0;
    const previos = antes.length;
    this.pegadoAlFondo = false;
    await this.loadOlder();
    afterNextRender(() => {
      this.escucharCargasDeMedia();
      // `track $index`: los nodos se reusan por posición, así que el mensaje que era el primero
      // ahora está en el índice (total nuevo − total previo).
      const idx = this.mensajesDom(el).length - previos;
      this.anclaLectura = { idx, offset, hasta: Date.now() + 5000 };
      this.reubicarAncla();
    }, { injector: this.injector });
  }

  private anclaLectura: { idx: number; offset: number; hasta: number } | null = null;

  private mensajesDom(el: HTMLElement): HTMLElement[] {
    return Array.from(el.querySelectorAll<HTMLElement>('.conv-msg'));
  }

  /** Mantiene el mensaje anclado en la misma posición (tras anteponer mensajes / cargar imágenes). */
  private reubicarAncla(): void {
    const el = this.convBody()?.nativeElement;
    const a = this.anclaLectura;
    if (!el || !a) return;
    if (Date.now() > a.hasta) { this.anclaLectura = null; return; }
    const msg = this.mensajesDom(el)[a.idx];
    if (!msg) return;
    const actual = msg.getBoundingClientRect().top - el.getBoundingClientRect().top;
    el.scrollTop += actual - a.offset;
  }

  /** Scroll del usuario: si se aleja del fondo, se deja de "pegar"; si vuelve abajo, se re-pega. */
  onConvScroll(): void {
    const el = this.convBody()?.nativeElement;
    if (!el) return;
    this.pegadoAlFondo = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    // Si el usuario se desplazó por su cuenta, se suelta el ancla (nuestro propio reubicado deja
    // el ancla exactamente en su lugar, así que no la cancela).
    const a = this.anclaLectura;
    const msg = a ? this.mensajesDom(el)[a.idx] : null;
    if (a && msg && Math.abs(msg.getBoundingClientRect().top - el.getBoundingClientRect().top - a.offset) > 4) {
      this.anclaLectura = null;
    }
  }

  /** Baja al último mensaje tras el próximo render (componente zoneless: el DOM de los mensajes
   *  recién seteados todavía no existe en este tick). */
  private scrollAlFinal(): void {
    afterNextRender(() => {
      this.escucharCargasDeMedia();
      this.scrollAlFinalYa();
    }, { injector: this.injector });
  }

  private scrollAlFinalYa(): void {
    const el = this.convBody()?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  /** Las imágenes (thumbnails de adjuntos, imágenes embebidas) cargan DESPUÉS del primer render y
   *  hacen crecer la conversación: el evento `load` no burbujea, pero se captura en fase de captura
   *  sobre el contenedor. Mientras siga "pegado al fondo", cada carga lo vuelve a bajar. */
  private escucharCargasDeMedia(): void {
    const el = this.convBody()?.nativeElement ?? null;
    if (!el || el === this.escuchaCargas) return;
    this.escuchaCargas?.removeEventListener('load', this.onMediaCargada, true);
    el.addEventListener('load', this.onMediaCargada, true);
    this.escuchaCargas = el;
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

  /** Reasignar el ticket: rol HELPDESK en el alcance del cliente, o ADMIN (el backend lo re-exige). */
  puedeReasignar(): boolean {
    this.header(); // dependencia reactiva: `ticketObj` se completa junto con el header al cargar
    // HELPDESK/ADMIN, responsable (a su gente) o cualquiera que se toma un ticket sin asignado.
    return !!this.ticketObj && this.auth.puedeAsignarTicket(this.ticketObj);
  }

  /** Abre el modal de asignación (reusa AssignTicketDialog) y refresca el header al asignar. */
  async cambiarAsignado(): Promise<void> {
    if (this.soloLectura() || this.asignando() || !this.ticketObj || !this.puedeReasignar()) return;
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

  /** Popup de solo lectura con el asunto completo — el título del header lo trunca (1-2 líneas)
   *  y el `matTooltip` no sirve en celular (no hay hover). */
  verAsuntoCompleto(): void {
    this.dialog.open(TicketTitleDialog, { data: { asunto: this.header().asunto }, width: '480px', maxWidth: '90vw', autoFocus: false });
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
    const esEmp = this.esEmpleado(m);
    return {
      id: String(m.id || ''),
      // Nombre completo para identificar fácil; el código (entry_user_id) es el fallback.
      autor: esSys ? 'Sistema' : m.entry_user_name || m.entry_user_id || '—',
      tipo: esSys ? 'sys' : esEmp ? 'emp' : 'cli',
      fecha: m.entry_date ? String(m.entry_date).replace('T', ' ').slice(0, 16) : '',
      html: texto || html.includes('<img') ? this.sanitizer.bypassSecurityTrustHtml(html) : null,
      rawHtml,
      // El servidor decide (ventana de 10 min + solo el autor); no se recalcula en el cliente.
      canEdit: m.can_edit === true,
      adjuntos,
      // Solo empleados tienen un hid interno resoluble por `ColoresService` — cliente/Sistema
      // quedan `undefined` (avatar gris neutro, ver `avatarDe()`).
      hid: esEmp && m.entry_user_id ? String(m.entry_user_id).trim().toUpperCase() : undefined,
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
    const ext = this.extSync(res) || (await this.extPorBytes(res.url));
    descargarUrl(
      res.url,
      nombre ? `${nombre}${ext && !nombre.endsWith(ext) ? ext : ''}` : res.filename || `adjunto_${this.ticketId}${ext}`,
    );
    setTimeout(() => URL.revokeObjectURL(res.url), 10000);
  }

  /**
   * Extensión del adjunto, en cascada de más fiable a más defensiva:
   *   1. el **nombre real** del `Content-Disposition` (cuando el proxy lo reenvía);
   *   2. el **MIME** de la respuesta (inútil si es `application/octet-stream`);
   *   3. la **firma binaria** del propio archivo — no depende de ninguna cabecera.
   * Sin el paso 3, basta un proxy que no reenvíe `Content-Disposition` para que el archivo baje
   * sin extensión y el sistema operativo lo dé por dañado.
   */
  private extSync(info: { filename: string; type: string }): string {
    return (info.filename.match(/\.[^.\s]+$/) || [''])[0] || extFromMime(info.type);
  }

  /** Paso 3 (lento): leer los bytes. Solo cuando los dos rápidos fallaron. */
  private async extPorBytes(url: string): Promise<string> {
    try {
      // El blob ya está en memoria (blob: URL), así que releerlo no cuesta red.
      return await extFromBytes(await (await fetch(url)).blob());
    } catch {
      return '';
    }
  }

  /** Baja el blob de un adjunto UNA vez y guarda si es imagen + su blob URL (progresivo). */
  private async resolverAdjunto(id: string): Promise<void> {
    const s = String(id || '');
    if (!s || this.adjPedidos.has(s)) return;
    this.adjPedidos.add(s);
    const res = await this.hd.fetchAttachment(s);
    if (!res) { this.adjPedidos.delete(s); return; } // falló → permite reintento en otra carga
    this.attachInfo.update((m) => ({
      ...m,
      [s]: { isImage: (res.type || '').startsWith('image/'), url: res.url, filename: res.filename, type: res.type },
    }));
  }

  /** Abre el adjunto imagen en el lightbox (reusa el blob ya resuelto). */
  abrirImagenAdjunto(id: string): void {
    const u = this.attachInfo()[String(id)]?.url;
    if (u) this.lightbox.set(u);
  }

  /**
   * Descarga un adjunto. Si ya está resuelto reutiliza su blob (sin re-bajar); si no, cae a
   * `openAttachment` (que lo baja). Mantiene el nombre `adjunto_<ticket>-N` + la extensión real.
   *
   * ⚠️ **SÍNCRONO a propósito en el camino normal.** Chrome bloquea EN SILENCIO las descargas que
   * no salen de un gesto del usuario, y la ventana **standalone de una PWA** es mucho más estricta
   * que una pestaña. Poner un `await` entre el clic y `descargarUrl()` rompe esa cadena y el
   * archivo no baja: ni descarga, ni petición de red, ni error en consola — "no pasa nada".
   * Por eso la extensión se resuelve primero por las vías que NO esperan (nombre real y MIME) y
   * solo se cae al paso lento (leer los bytes) cuando ambas fallan, que es lo raro.
   */
  descargar(a: { id: string; nombre: string }): void {
    const info = this.attachInfo()[String(a.id)];
    if (!info) { void this.openAttachment(a.id, a.nombre); return; }
    const nombreCon = (ext: string) =>
      a.nombre ? `${a.nombre}${ext && !a.nombre.endsWith(ext) ? ext : ''}` : info.filename || `adjunto_${this.ticketId}${ext}`;

    const ext = this.extSync(info);
    if (ext) { descargarUrl(info.url, nombreCon(ext)); return; } // gesto intacto → baja seguro
    // Sin extensión deducible sin esperar: se lee la firma binaria. Aquí sí se pierde el gesto,
    // pero es preferible a bajar el archivo sin extensión (el SO lo daría por dañado).
    void this.extPorBytes(info.url).then((e) => descargarUrl(info.url, nombreCon(e)));
    // No se revoca info.url: se sigue usando para el thumbnail/lightbox; se libera al cerrar.
  }

  /** Copia el texto de un mensaje al portapapeles (texto plano, conservando saltos de línea).
   *  Funciona en Pages (HTTPS, API moderna) y en on-prem (HTTP, fallback execCommand). */
  async copiarMensaje(m: ConvMsg): Promise<void> {
    const texto = htmlToText(m.rawHtml);
    if (!texto) {
      this.snack.open('Este mensaje no tiene texto para copiar.', 'OK', { duration: 2000 });
      return;
    }
    const ok = await copyText(texto);
    this.snack.open(ok ? 'Mensaje copiado' : 'No se pudo copiar el mensaje.', 'OK', { duration: 1500 });
  }

  /**
   * Construye el reemplazador de nombres de EMPLEADO para el PDF. Devuelve `texto => texto` si no
   * hay a quién ocultar.
   *
   * Los nombres salen de dos fuentes que **solo contienen gente de Soft Warehouse**: el catálogo del
   * Helpdesk (`getHdUsers` filtra por rol interno SOPORTE/ADMINISTRADOR/SUPERVISOR) y los autores de
   * esta misma conversación marcados como empleado (cubre a quien ya no esté en el catálogo).
   * **El cliente NUNCA está en ninguna de las dos → su nombre no se toca por construcción.**
   *
   * Se generan también las parejas de palabras del nombre ("MARIA SOL", "SOL CONTRERAS") porque en el
   * cuerpo del mensaje la gente rara vez escribe el nombre completo. NO se baja a nombres de pila
   * sueltos: destrozaría el texto del cliente (hay muchos "Juan").
   */
  private async construirAnonimizador(): Promise<(t: string) => string> {
    const nombres = new Set<string>();
    const agregar = (n: string) => {
      const limpio = String(n || '').trim().replace(/\s+/g, ' ');
      if (limpio.length < 5) return; // ni iniciales ni basura
      nombres.add(limpio);
      const partes = limpio.split(' ').filter((p) => p.length >= 3);
      for (let i = 0; i + 1 < partes.length; i++) nombres.add(`${partes[i]} ${partes[i + 1]}`);
      if (partes.length > 2) nombres.add(`${partes[0]} ${partes[partes.length - 1]}`);
    };
    try {
      for (const u of await this.hd.getHdUsers()) agregar(u.name);
    } catch { /* sin catálogo: quedan los autores de la conversación */ }
    for (const m of this.sortedRaw) if (this.esEmpleado(m)) agregar(m.entry_user_name);
    if (!nombres.size) return (t) => t;

    // Patrón tolerante a tildes y mayúsculas: se compara sobre el nombre SIN tildes y cada vocal
    // admite su variante acentuada, así "MARIA" casa con "María" y al revés.
    const sinTildes = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const FLEX: Record<string, string> = {
      a: '[aáà]', e: '[eéè]', i: '[iíì]', o: '[oóò]', u: '[uúùü]', n: '[nñ]',
    };
    const patron = [...nombres]
      .sort((a, b) => b.length - a.length) // el más largo primero: gana el nombre completo
      .map((n) =>
        sinTildes(n)
          .split('')
          .map((c) => (/[a-z]/i.test(c) ? FLEX[c.toLowerCase()] || c : c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
          .join(''),
      )
      .join('|');
    // Sin lookbehind (no lo soporta todo navegador): los delimitadores se capturan y se reponen.
    const re = new RegExp(`(^|[^\\p{L}])(?:${patron})(?=[^\\p{L}]|$)`, 'giu');
    return (t: string) => String(t || '').replace(re, '$1Soporte');
  }

  /** Exporta TODA la conversación (no solo el bloque cargado: recorre `sortedRaw`) a un PDF.
   *  Documento de texto plano: encabezado del ticket + cada mensaje (fecha · autor + cuerpo) y
   *  los nombres de sus adjuntos. Regla #8: autor por NOMBRE, nunca el código.
   *
   *  ⭐ PRIVACIDAD: este PDF puede acabar en manos del cliente, así que **los empleados salen como
   *  "Soporte"** — tanto en la etiqueta del autor como DENTRO del texto (los mensajes automáticos
   *  dicen "El usuario ‹NOMBRE› cambió el estado", así que anonimizar solo el autor no serviría de
   *  nada). El cliente y su texto se ven tal cual. En pantalla NO se anonimiza: dentro de FitDesk el
   *  equipo tiene que seguir viendo quién dijo qué. */
  async descargarConversacion(): Promise<void> {
    if (this.descargandoPdf() || this.loading()) return;
    if (!this.sortedRaw.length) {
      this.snack.open('No hay mensajes para descargar.', 'OK', { duration: 2000 });
      return;
    }
    this.descargandoPdf.set(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const M = 40;
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const usable = pageW - 2 * M;
      let y = M;
      // Salta de página si no cabe un bloque de alto `h`.
      const ensure = (h: number) => { if (y + h > pageH - M) { doc.addPage(); y = M; } };
      // Escribe líneas envueltas con un estilo dado; parte de página línea a línea.
      const writeLines = (text: string, size: number, style: 'normal' | 'bold', color: number, lh: number) => {
        doc.setFont('helvetica', style); doc.setFontSize(size); doc.setTextColor(color);
        for (const raw of String(text).split('\n')) {
          const wrapped: string[] = doc.splitTextToSize(raw || ' ', usable);
          for (const ln of wrapped) { ensure(lh); doc.text(ln, M, y); y += lh; }
        }
      };

      // ── Encabezado ──
      const h = this.header();
      writeLines(`Ticket ${this.ticketId}`, 20, 'bold', 20, 24);
      if (h.asunto) { y += 2; writeLines(h.asunto, 12, 'bold', 40, 16); }
      const meta = [h.cliente, h.estatus].filter(Boolean).join('  ·  ');
      const now = new Date();
      const p = (n: number) => String(n).padStart(2, '0');
      const gen = `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())} ${p(now.getHours())}:${p(now.getMinutes())}`;
      y += 4; writeLines(`${meta ? meta + '  ·  ' : ''}Generado: ${gen}`, 9, 'normal', 120, 13);
      y += 8; ensure(2); doc.setDrawColor(210); doc.line(M, y, pageW - M, y); y += 16;

      // ── Mensajes (todos, orden cronológico) ──
      // Por defecto se anonimiza. Un responsable puede pedir los nombres reales desde su perfil,
      // solo para su sesión; el rol se RE-VERIFICA aquí y no se confía solo en la casilla.
      const conNombres = this.auth.pdfSinAnonimizar() && this.auth.puedeVerNombresEnPdf();
      // `anonimizar` oculta a los EMPLEADOS (nunca al cliente). Ver `construirAnonimizador`.
      const anonimizar = conNombres ? (t: string) => t : await this.construirAnonimizador();
      for (const m of this.sortedRaw) {
        const esSys = m.system_message === true;
        // Empleado → "Soporte". El cliente conserva su nombre: sin él, el PDF no sirve de nada.
        const autor = esSys
          ? 'Sistema'
          : !conNombres && this.esEmpleado(m)
            ? 'Soporte'
            : m.entry_user_name || m.entry_user_id || '—';
        const fecha = m.entry_date ? String(m.entry_date).replace('T', ' ').slice(0, 16) : '';
        const safe = safeHtml(m.detail || '');
        // El cuerpo SIEMPRE pasa por el filtro, venga de quien venga: los mensajes automáticos
        // ("El usuario ‹NOMBRE› cambió el estado") y las menciones dentro del texto del cliente
        // también nombran al consultor.
        const texto = anonimizar(htmlToText(safe));
        const adjuntos = this.attachsDeMensaje(m);
        if (!texto && !safe.includes('<img') && !adjuntos.length) continue; // vacío → se omite (como en la vista)
        writeLines(`${fecha ? fecha + '  ·  ' : ''}${autor}`, 10, 'bold', 30, 14);
        if (texto) writeLines(texto, 10, 'normal', 45, 14);
        else if (safe.includes('<img')) writeLines('[imagen]', 10, 'normal', 120, 14);
        for (const a of adjuntos) writeLines(`• Adjunto: ${a.nombre}`, 9, 'normal', 120, 12);
        y += 12; // separación entre mensajes
      }

      doc.save(`conversacion_${this.ticketId}.pdf`);
    } catch {
      this.snack.open('No se pudo generar el PDF. Intenta de nuevo.', 'OK', { duration: 3000 });
    } finally {
      this.descargandoPdf.set(false);
    }
  }

  /** Libera los blob URLs de los adjuntos (al cerrar o antes de recargar) para no fugar memoria. */
  private revokeAttachBlobs(): void {
    const m = this.attachInfo();
    for (const k in m) { try { URL.revokeObjectURL(m[k].url); } catch { /* noop */ } }
    this.attachInfo.set({});
    this.adjPedidos.clear();
  }

  /**
   * Tope de un adjunto: **lo impone el API del Helpdesk**, no nosotros. Sin este control el archivo
   * grande se aceptaba sin rechistar y reventaba al ENVIAR, con un "Error al enviar." que no decía
   * cuál era el archivo ni por qué, y perdiendo el mensaje escrito.
   */
  private static readonly MAX_ADJUNTO = 5 * 1024 * 1024;

  /** "8,4 MB" — tamaño legible para el aviso. */
  private pesoLegible(bytes: number): string {
    return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
  }

  /**
   * Filtra por tamaño los archivos que llegan por CUALQUIERA de las tres vías (selector, arrastrar,
   * pegar) y avisa nombrando los que no entran. Devuelve solo los aceptados; el rechazo ocurre al
   * ADJUNTAR, así que el texto ya escrito nunca se pierde.
   */
  private aceptarArchivos(entrantes: File[]): File[] {
    const ok: File[] = [];
    const grandes: File[] = [];
    for (const f of entrantes) (f.size > TicketMessagesDialog.MAX_ADJUNTO ? grandes : ok).push(f);
    if (grandes.length) {
      const detalle = grandes.map((f) => `${f.name} (${this.pesoLegible(f.size)})`).join(', ');
      const consejo = grandes.every((f) => f.type.startsWith('image/'))
        ? ' Prueba a guardarla como JPG o reducir su tamaño.'
        : '';
      this.snack.open(
        `${detalle} ${grandes.length > 1 ? 'superan' : 'supera'} el límite de 5 MB del Helpdesk.${consejo}`,
        'OK',
        { duration: 6000 },
      );
    }
    return ok;
  }

  onFiles(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.revokeAllPreviews(); // el input reemplaza la lista → libera previews viejos
    this.composerFiles = this.aceptarArchivos(input.files ? [...input.files] : []);
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
    const dropped = this.aceptarArchivos(e.dataTransfer?.files ? [...e.dataTransfer.files] : []);
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
    // Imágenes del portapapeles (captura de pantalla, copiar-imagen del navegador): van como ADJUNTO,
    // igual que si se arrastraran. Se hace ANTES del pegado de HTML a propósito: al copiar desde una
    // web el portapapeles trae la imagen Y un <img> en el text/html, y si se pegaran las dos, la
    // imagen viajaría duplicada (incrustada en el texto y como archivo).
    const imagenes = [...(data.files || [])].filter((f) => f.type.startsWith('image/'));
    if (imagenes.length) {
      const nuevos = this.aceptarArchivos(imagenes.map((f) => this.conNombreDeCaptura(f)));
      if (nuevos.length) this.composerFiles = [...this.composerFiles, ...nuevos];
      return;
    }
    const limpio = clipboardToHtml(data.getData('text/html'), data.getData('text/plain'));
    document.execCommand('insertHTML', false, limpio);
  }

  /**
   * Una imagen pegada llega sin nombre útil ('image.png' o vacío) y así la recibiría el cliente.
   * Se renombra a `captura_<ticket>_<hh-mm-ss>.<ext>`, con la extensión deducida del MIME.
   */
  private conNombreDeCaptura(f: File): File {
    if (f.name && f.name !== 'image.png' && !f.name.startsWith('image.')) return f;
    const ext = (f.type.split('/')[1] || 'png').replace('jpeg', 'jpg').split('+')[0];
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    const nombre = `captura_${this.ticketId}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}.${ext}`;
    return new File([f], nombre, { type: f.type });
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
