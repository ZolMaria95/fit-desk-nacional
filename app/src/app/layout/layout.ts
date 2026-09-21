import { Component, DestroyRef, ElementRef, afterNextRender, afterRenderEffect, computed, effect, inject, signal, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { filter, map } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { ColoresService } from '../core/services/colores.service';
import { DataService } from '../core/services/data.service';
import { HelpdeskService } from '../core/services/helpdesk.service';
import { ShellService } from '../core/services/shell.service';
import { SearchService } from '../core/services/search.service';
import { PerfilService } from '../core/services/perfil.service';
import { TransferenciasService } from '../core/services/transferencias.service';
import { PerfilDialog } from '../features/perfil/perfil-dialog';
import { ReminderAlertDialog, ReminderItem } from '../features/pendientes/reminder-alert-dialog/reminder-alert-dialog';
import { NuevosTicketsService } from '../core/services/nuevos-tickets.service';
import { NotificacionesService, Notificacion } from '../core/services/notificaciones.service';
import { equipoClientIdsDe } from '../features/tickets/ticket-utils';
import { fmtMod } from '../features/tickets/tickets-card-utils';
import { ThemeService } from '../core/services/theme.service';
import { CardDetailDialog } from '../features/board/card-detail-dialog/card-detail-dialog';
import { ReunionDialog } from '../features/board/reunion-dialog/reunion-dialog';
import { TicketMessagesDialog } from '../features/tickets/ticket-messages-dialog/ticket-messages-dialog';
import { NOTIF_ESTILO, notifJoinHref, notifLinkLabel, notifTabDe } from './notif-utils';

/**
 * Shell responsive: menú hamburguesa lateral (`mat-sidenav`). En escritorio el
 * panel queda fijo; en móvil/tablet (o en Board, vía `collapsibleNav`) es overlay
 * con botón ☰. El drawer muestra arriba los filtros que publica la vista activa
 * ([ShellService]) y debajo los submenús de navegación.
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private readonly auth = inject(AuthService);
  private readonly data = inject(DataService);
  private readonly helpdesk = inject(HelpdeskService);
  private readonly router = inject(Router);
  private readonly breakpoints = inject(BreakpointObserver);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  readonly shell = inject(ShellService);
  readonly perfil = inject(PerfilService);
  private readonly search = inject(SearchService);
  private readonly transferencias = inject(TransferenciasService);
  private readonly nuevosTickets = inject(NuevosTicketsService);
  readonly notificaciones = inject(NotificacionesService);
  private readonly colores = inject(ColoresService);
  readonly theme = inject(ThemeService);

  /** Badge del menú "Bandeja": pendientes (transferencias + solicitudes + mensajes). */
  readonly bandejaPendientes = this.transferencias.pendientesBandeja;
  private bandejaPedida = false;
  private turnoPedido = false;

  /** Evita apilar varias alertas de recordatorio a la vez. */
  private alertOpen = false;
  /** AudioContext perezoso para el sonido de la alerta. */
  private audioCtx: AudioContext | null = null;

  readonly session = this.auth.session;
  readonly puedeVerMiPanel = this.auth.puedeVerMiPanel;
  /** Administración: solo ADMIN y solo en modo Quarkus (Firebase no tiene ese modelo). */
  readonly mostrarAdmin = computed(() => this.auth.puedeAdministrar() && this.data.usesQuarkus());
  /** Bandeja de envíos entre equipos: RE/ADMIN y solo en modo Quarkus. */
  readonly mostrarBandeja = computed(() => this.auth.puedeTransferir() && this.data.usesQuarkus());
  /** Campanita: solo en modo Quarkus (el buzón es una entidad propia, no existe en Firebase). */
  readonly mostrarNotificaciones = computed(() => this.data.usesQuarkus());
  /** Senior de Turno: función nueva, solo en modo Quarkus (sin equivalente en Firebase/legacy). */
  readonly mostrarSeniorTurno = computed(() => this.data.usesQuarkus());
  /** ¿El usuario logueado está de turno HOY (en cualquiera de los 2 roles, en cualquier equipo)?
   *  Punto rojo del menú — se revisa 1 vez por carga (el turno no cambia minuto a minuto). */
  readonly deTurnoHoy = signal(false);
  readonly turnoRol = signal<'mesaAyuda' | 'emergentes' | null>(null);
  readonly turnoEquipoNombre = signal('');

  /** Lista del panel de la campanita — se carga al abrirlo, no en cada tick de 30 s. */
  readonly notifLista = signal<Notificacion[]>([]);
  private notifCargando = false;

  /** Pestaña activa del panel: Todas/Tareas/Tickets (mismo agrupamiento por destino de navegación
   *  que ya usa `abrirNotificacion()` — Tareas = todo lo que gira en torno a una Tarea). */
  readonly notifTab = signal<'todas' | 'tareas' | 'tickets'>('todas');
  readonly notifConteoTareas = computed(() => this.notifLista().filter((n) => notifTabDe(n.tipo) === 'tareas').length);
  readonly notifConteoTickets = computed(() => this.notifLista().filter((n) => notifTabDe(n.tipo) === 'tickets').length);
  readonly notifFiltrada = computed(() => {
    const t = this.notifTab();
    return t === 'todas' ? this.notifLista() : this.notifLista().filter((n) => notifTabDe(n.tipo) === t);
  });
  readonly notifNuevas = computed(() => this.notifFiltrada().filter((n) => !n.leida));
  readonly notifAnteriores = computed(() => this.notifFiltrada().filter((n) => n.leida));
  readonly notifVacioMsg = computed(() => {
    if (this.notifFiltrada().length) return '';
    if (this.notifTab() === 'tareas') return 'Sin notificaciones de tareas';
    if (this.notifTab() === 'tickets') return 'Sin notificaciones de tickets';
    return 'Sin notificaciones';
  });
  /** Wrapper con parámetro tipado: indexar `NOTIF_ESTILO[n.tipo]` directo desde la plantilla da
   *  "any no puede indexar Record" porque `n` (del contexto de `*ngTemplateOutlet`) llega sin tipo. */
  notifEstiloDe(tipo: Notificacion['tipo']) {
    return NOTIF_ESTILO[tipo];
  }
  readonly notifLinkLabel = notifLinkLabel;
  readonly notifJoinHref = notifJoinHref;
  readonly fmtMod = fmtMod;

  /** Trae el listado completo (leídas + no leídas) al abrir el panel de la campanita. Siempre
   *  arranca en "Todas" para no confundir si quedó en otra pestaña de una apertura anterior. */
  async abrirPanelNotificaciones(): Promise<void> {
    if (this.notifCargando) return;
    this.notifCargando = true;
    this.notifTab.set('todas');
    try {
      this.notifLista.set(await this.notificaciones.listar());
    } catch {
      /* silencioso */
    } finally {
      this.notifCargando = false;
    }
  }

/** Marca leída una notificación sin navegar — usado por "Unirse" (un `<a target="_blank">`, que
   *  ya navega por sí solo) además de `abrirNotificacion()`. */
  async marcarLeidaSilencioso(n: Notificacion): Promise<void> {
    if (n.leida) return;
    try {
      await this.notificaciones.marcarLeida(n.id);
      n.leida = true;
      this.notificaciones.noLeidas.set(Math.max(0, this.notificaciones.noLeidas() - 1));
    } catch {
      /* silencioso */
    }
  }

  /** Clic en un ítem del buzón: la marca leída y navega/abre igual que el popup para su tipo. */
  async abrirNotificacion(n: Notificacion): Promise<void> {
    await this.marcarLeidaSilencioso(n);
    const url = n.url || '';
    if (n.tipo === 'TAREA_ASIGNADA' || n.tipo === 'TAREA_SIN_FINALIZAR' || n.tipo === 'REUNION') {
      // `&join=...` puede venir pegado al final (solo en REUNION) — se descarta al extraer el código.
      const tareaId = url.split('card=')[1]?.split('&')[0];
      // `stories()` es GLOBAL (todas las tareas de todos los boards, `GET /stories` sin filtro) — el
      // fallback a `/board` sin más solo debería darse si la tarea ya no existe de verdad. Se espera
      // `ensureInit()` (memoizado: si ya cargó, resuelve al instante) para no perder la carrera si el
      // clic llega antes de que `stories()` se haya poblado la primera vez.
      await this.data.ensureInit();
      const story = tareaId ? this.data.stories().find((s) => s.id === tareaId) : undefined;
      if (story) {
        // Las reuniones usan su propio modal (tema/link/horario editable) — mismo criterio que
        // `board.ts:openDetail()`. Sin esto, una reunión abierta desde una notificación caía en
        // `CardDetailDialog`, que no tiene campo de hora.
        if (story.tipo === 'REUNION') {
          this.dialog.open(ReunionDialog, { data: { story }, width: '520px', maxWidth: '95vw' });
        } else {
          this.dialog.open(CardDetailDialog, { data: { story }, width: '560px', maxWidth: '95vw' });
        }
      } else {
        this.router.navigateByUrl('/board');
      }
    } else if (n.tipo === 'RECORDATORIO' || n.tipo === 'TICKET_NOVEDAD') {
      const ticketId = url.split('resaltar=')[1];
      // Un RECORDATORIO sin ticket (clave sintética "REC-...") no tiene conversación que abrir —
      // `notifLinkLabel()` ya no muestra el botón-link para este caso, pero se guarda acá también
      // por si acaso (misma defensa que `esSinTicket()` en `ReminderAlertDialog`).
      if (ticketId && !ticketId.startsWith('REC-')) {
        this.dialog.open(TicketMessagesDialog, { data: { ticketId }, width: '920px', maxWidth: '92vw' });
      }
    } else if (n.tipo === 'TRANSFERENCIA_PENDIENTE' || n.tipo === 'SOLICITUD_PENDIENTE') {
      this.router.navigateByUrl(url.replace(/^#/, '') || '/bandeja');
    }
  }

  async marcarTodasLeidas(): Promise<void> {
    try {
      await this.notificaciones.marcarTodasLeidas();
      this.notifLista.set(this.notifLista().map((n) => ({ ...n, leida: true })));
      this.notificaciones.noLeidas.set(0);
    } catch {
      /* silencioso */
    }
  }

  private readonly isDesktop = toSignal(this.breakpoints.observe('(min-width: 900px)').pipe(map((r) => r.matches)), {
    initialValue: typeof window !== 'undefined' && window.innerWidth >= 900,
  });

  /** Panel fijo (mode `side`, siempre abierto) en escritorio; overlay (`over`) en móvil.
   *  Depende SOLO del breakpoint — NUNCA de la ruta/pantalla — para que el modo sea
   *  idéntico en todas las vistas. (Antes Board usaba `over` en escritorio vía
   *  `collapsibleNav`: esa inconsistencia de modo entre rutas dejaba el contenido
   *  `inert` pegado al navegar en círculo. En `side` Material no aplica focus-trap/inert.) */
  readonly fixed = computed(() => this.isDesktop());
  readonly mode = computed<'side' | 'over'>(() => (this.fixed() ? 'side' : 'over'));
  private readonly currentUrl = signal(this.router.url);
  /** Texto del buscador ÚNICO del shell (N° de ticket o texto; el tipo se deduce). */
  readonly gBuscar = signal('');
  /** En móvil el buscador vive detrás de un ícono (no entra un input fijo junto a ☰+marca+campanita
   *  +perfil): `true` mientras está desplegado a ancho completo, reemplazando esos íconos. Sin
   *  efecto en escritorio (ahí el buscador siempre está visible en la barra superior). */
  readonly mobileSearchOpen = signal(false);

  /** Estado manual del drawer (botón ☰) cuando es overlay; en modo fijo se ignora. */
  readonly drawerOpen = signal(false);
  /** Abierto = fijo (side, siempre abierto) o abierto manualmente en overlay. Derivar
   *  `opened` y `mode` de `fixed()` juntos evita que el drawer se abra en modo `over`
   *  durante la transición (lo que dejaba el contenido `inert` en zoneless). */
  readonly opened = computed(() => this.fixed() || this.drawerOpen());

  /** Contenido del shell (para limpiar un `inert` que Material pudo dejar pegado). */
  private readonly shellContent = viewChild<ElementRef<HTMLElement>>('shellContent');
  /** Contenedor de scroll (`.content`): se registra en ShellService para que las
   *  vistas puedan volver al tope (p. ej. al paginar). */
  private readonly contentEl = viewChild<ElementRef<HTMLElement>>('contentEl');
  /** Input del buscador móvil desplegado (para autofocar al abrirlo). */
  private readonly mobileSearchInput = viewChild<ElementRef<HTMLInputElement>>('mobileSearchInput');

  constructor() {
    // Si la sesión se PIERDE estando ya dentro (token vencido, 401, logout en otra
    // pestaña), el `authGuard` NO vuelve a correr: solo se evalúa al navegar. El
    // usuario quedaba atrapado —sin bloque de usuario, sin botón "Cerrar sesión" y
    // sin redirección—, viendo errores del API y sin forma de volver al login. Este
    // effect lo saca al login en cuanto la sesión desaparece.
    effect(() => {
      if (!this.auth.session() && !this.router.url.startsWith('/login')) {
        this.dialog.closeAll();
        this.router.navigate(['/login']);
      }
    });
    // Badge de la Bandeja: al cargar los roles (ser RE/ADMIN en modo Quarkus), trae el
    // conteo de pendientes UNA vez para el menú. Luego la propia Bandeja lo mantiene al día.
    effect(() => {
      if (this.mostrarBandeja() && !this.bandejaPedida) {
        this.bandejaPedida = true;
        void this.transferencias.refrescarPendientesBandeja();
      }
    });
    // Punto rojo de "Senior de Turno": 1 sola consulta agregada (todos los equipos) por carga,
    // igual que el patrón de arriba para la Bandeja — el turno no cambia minuto a minuto, así
    // que no hace falta el polling de 30s que sí tienen recordatorios/novedades/notificaciones.
    effect(() => {
      if (this.mostrarSeniorTurno() && !this.turnoPedido) {
        this.turnoPedido = true;
        void this.data.checkTurnoSeniorHoy().then((r) => {
          this.deTurnoHoy.set(r.deTurno);
          this.turnoRol.set(r.rol ?? null);
          this.turnoEquipoNombre.set(r.equipoNombre || '');
        });
      }
    });
    // Al ESTRECHAR la ventana (escritorio → móvil), cerrar el panel de navegación.
    // En escritorio el drawer está fijo y abierto; Material emite `openedChange(true)` y eso
    // deja `drawerOpen` encendido. Como `opened = fixed() || drawerOpen()`, al cruzar el
    // breakpoint `fixed()` pasa a false pero `drawerOpen` seguía en true → el panel se
    // quedaba ABIERTO en modo overlay, con backdrop, tapando el contenido. Antes solo se
    // cerraba al navegar (ver la suscripción a NavigationEnd más abajo), así que el usuario
    // tenía que cambiar de sección para recuperar la pantalla.
    effect(() => {
      if (!this.fixed()) this.drawerOpen.set(false);
    });
    // Carga los datos (Firebase/localStorage) y arranca el sync en tiempo real.
    this.data.ensureInit().then(() => {
      this.data.startStreaming();
      this.checkReminders();
    });
    // Carga los catálogos de empleados y clientes al entrar (ya con sesión), para
    // que los nombres de consultor/cliente estén listos app-wide y no dependan de
    // abrir una vista concreta. Reintentan solos si la 1ª petición falla.
    this.helpdesk.getHdUsers();
    this.helpdesk.getClients();
    // Fotos de perfil (backend/Neon) para pintar los avatares con la imagen subida.
    this.perfil.cargarFotos();
    // Perfil del actor (equipos/clientes/alcance + preferencia de tema). Al cargar, el ThemeService
    // reconcilia el tema con el backend (fuente de verdad; el cache ya lo aplicó sin flash).
    this.perfil.cargarMiPerfil().then(() => {
      this.perfilListo = true;
      this.theme.sincronizar();
    });
    // Equipos que reviso + sus clientes: los necesita el poll de NOVEDADES de abajo para saber
    // qué clientes vigilar. Se carga AQUÍ (en el shell) y no solo en Tickets: si no, la alerta
    // solo funcionaba después de haber abierto esa pestaña — un responsable que entrara al Board
    // y se quedara ahí no recibía ningún aviso, que es justo lo que esta función debe evitar.
    this.perfil.cargarEquiposRevisar().then(() => void this.checkNuevosTickets());
    // Recordatorios de tickets pendientes: revisa cada 30s para que la alerta salte
    // cerca de la hora exacta (la lista vive en memoria, sin costo de red). En el MISMO
    // tick se refresca el contador de la Bandeja (RE/ADMIN): así el badge del menú
    // aparece solo —sin tener que abrir la Bandeja— y capta pendientes nuevos en ≤30s.
    const timer = setInterval(() => {
      this.checkReminders();
      if (this.mostrarBandeja()) void this.transferencias.refrescarPendientesBandeja();
      void this.checkNuevosTickets();
      void this.notificaciones.refrescarNoLeidas();
    }, 30 * 1000);
    this.destroyRef.onDestroy(() => clearInterval(timer));
    // Conteo inicial del buzón (badge de la campanita), sin esperar el primer tick de 30 s.
    void this.notificaciones.refrescarNoLeidas();

    // Desbloquea el audio con la primera interacción del usuario (política de
    // autoplay): así el sonido de la alerta sí suena cuando llegue la hora.
    if (typeof window !== 'undefined') {
      const unlock = () => {
        try { this.ensureAudio()?.resume(); } catch { /* sin audio */ }
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
      };
      window.addEventListener('pointerdown', unlock);
      window.addEventListener('keydown', unlock);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
      });
    }

    // Red de seguridad (zoneless): el contenido SOLO debe quedar inerte cuando hay
    // un drawer overlay ABIERTO encima (over + opened). En cualquier otro caso —modo
    // fijo (side), o drawer cerrado (incluido el cierre al navegar en over)— debe ser
    // interactivo. En zoneless Material a veces no quita el `inert` al cerrar/cambiar
    // de modo, dejando la derecha "viva pero muerta" hasta recargar. Dos coberturas:
    //  1) afterRenderEffect: reacciona a cambios de fixed/opened (cerrar drawer, resize).
    afterRenderEffect(() => {
      const interactivo = this.fixed() || !this.opened(); // inerte solo si over + abierto
      const el = this.shellContent()?.nativeElement;
      if (el && interactivo) el.removeAttribute('inert');
    });
    // Registra el contenedor de scroll para que las vistas vuelvan al tope al paginar.
    afterNextRender(() => this.shell.registerContent(this.contentEl()?.nativeElement ?? null));
    // Autofoca el buscador móvil apenas se despliega (el input recién existe en el DOM después
    // de que `mobileSearchOpen()` pasa a `true` y Angular re-renderiza esa rama del `@if`).
    afterRenderEffect(() => {
      if (this.mobileSearchOpen()) this.mobileSearchInput()?.nativeElement.focus();
    });
    //  2) MutationObserver: quita `inert` apenas Material lo ponga (lo setea tarde,
    //     después del render, por eso el efecto solo no alcanza).
    afterNextRender(() => {
      const el = this.shellContent()?.nativeElement;
      if (!el) return;
      const strip = () => {
        if ((this.fixed() || !this.opened()) && el.hasAttribute('inert')) el.removeAttribute('inert');
      };
      strip();
      const obs = new MutationObserver(strip);
      obs.observe(el, { attributes: true, attributeFilter: ['inert'] });
      this.destroyRef.onDestroy(() => obs.disconnect());
    });

    // Al navegar: refresca la URL y, en overlay, cierra el drawer.
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => {
        this.currentUrl.set((e as NavigationEnd).urlAfterRedirects);
        if (!this.fixed()) this.drawerOpen.set(false);
      });
  }

  /**
   * Búsqueda ÚNICA del shell: un solo campo que acepta N° de ticket **o** texto.
   * Antes eran dos campos separados ("Ticket" y "Palabra") y obligaban al usuario a
   * decidir de antemano en cuál escribir. El tipo se DEDUCE: solo dígitos Y como máximo
   * 5 (los N° de ticket del HelpDesk van de 1 a 5 dígitos, nunca más) = N° de ticket
   * (búsqueda exacta); cualquier otra cosa — incluido un número de 6+ dígitos, que no
   * puede ser un ticket real — = texto (búsqueda por contenido). Siempre lleva a
   * Tickets, que es quien ejecuta y muestra el resultado.
   */
  buscarGlobal(): void {
    const v = this.gBuscar().trim();
    if (!v) return;
    this.search.buscar(/^\d{1,5}$/.test(v) ? 'ticket' : 'palabra', v);
    this.gBuscar.set('');
    this.mobileSearchOpen.set(false);
    this.router.navigate(['/tickets']);
    if (!this.fixed()) this.drawerOpen.set(false);
  }

  /** Se pone en `true` cuando `cargarMiPerfil()` resuelve (`equiposQueLidero()` ya es fiable).
   *  Evita que `checkReminders()` "purgue" el dedup permanente de tareas con una lista de
   *  vigentes vacía solo porque el perfil aún no cargó — ver su uso más abajo. */
  private perfilListo = false;
  private static readonly ALERTED_KEY = 'fit-daily_alerted';
  /** Dedup PERMANENTE (no diario) para tareas sin ticket: a diferencia de una reunión, una vez vista
   *  no vuelve a ser relevante mañana, así que no se limpia por fecha. Sí se borra la clave cuando la
   *  condición deja de cumplirse (reasignada / finalizada), para poder re-alertar si vuelve a ocurrir. */
  private static readonly ALERTED_TASKS_KEY = 'fit-daily_alerted_tareas';
  private alertedEver(key: string): boolean {
    try {
      return (JSON.parse(localStorage.getItem(Layout.ALERTED_TASKS_KEY) || '[]') as string[]).includes(key);
    } catch { return false; }
  }
  /** Sincroniza el set de claves ya vistas con las que siguen vigentes AHORA (unión de ambas
   *  alertas): agrega las nuevas y borra las que ya no aplican, para poder re-alertar si reaparecen. */
  private syncAlertedEver(vigentesAhora: string[], nuevasAAgregar: string[]): void {
    try {
      const prev = JSON.parse(localStorage.getItem(Layout.ALERTED_TASKS_KEY) || '[]') as string[];
      const vigentesSet = new Set(vigentesAhora);
      const next = new Set(prev.filter((k) => vigentesSet.has(k)));
      for (const k of nuevasAAgregar) next.add(k);
      localStorage.setItem(Layout.ALERTED_TASKS_KEY, JSON.stringify([...next]));
    } catch { /* localStorage lleno/no disponible: no bloquear la alerta */ }
  }
  /** Caché de la lista que me alarma (propios + los de los equipos donde soy responsable). */
  private alarmaCache: any[] = [];
  private alarmaCacheAt = 0;

  private async getAlarmaList(): Promise<any[]> {
    const now = Date.now();
    if (this.alarmaCacheAt && now - this.alarmaCacheAt < 45000) return this.alarmaCache;
    this.alarmaCache = (await this.data.loadPendientesVisibles()).filter((x: any) => x.alarma);
    this.alarmaCacheAt = now;
    return this.alarmaCache;
  }

  /** Dedup diario POR-NAVEGADOR (el responsable alerta pendientes ajenos que no puede marcar). */
  private alertedToday(key: string, today: string): boolean {
    try {
      return (JSON.parse(localStorage.getItem(Layout.ALERTED_KEY) || '{}') as Record<string, string>)[key] === today;
    } catch { return false; }
  }
  private markAlerted(keys: string[], today: string): void {
    try {
      const m = JSON.parse(localStorage.getItem(Layout.ALERTED_KEY) || '{}') as Record<string, string>;
      for (const k of keys) m[k] = today;
      for (const k of Object.keys(m)) if (m[k] !== today) delete m[k]; // limpia lo que no es de hoy
      localStorage.setItem(Layout.ALERTED_KEY, JSON.stringify(m));
    } catch { /* localStorage lleno/no disponible: no bloquear la alerta */ }
  }

  /** Checkbox "No avisar hoy" del propio popup (`ReminderAlertDialog`, tareas sin ticket): silencia
   *  SOLO esa tarea, SOLO por hoy — reusa el dedup diario de arriba (mismo storage que los
   *  recordatorios de ticket), a propósito distinto del dedup PERMANENTE (`ALERTED_TASKS_KEY`): no
   *  se marca como "vista para siempre", así que si sigue vigente mañana vuelve a alertar. */
  private silenciarTareaHoy(tareaId: string): void {
    const t = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    const todayStr = `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
    this.markAlerted([`tarea|${tareaId}`], todayStr);
  }

  /** Alerta de pendientes cuya fecha/hora ya llegó: propios + (si soy responsable) los de mi
   *  equipo. Diálogo visible en cualquier página + sonido, 1 vez por día por-navegador. */
  private async checkReminders(): Promise<void> {
    if (this.alertOpen) return;
    const now = Date.now();
    const p = (n: number) => String(n).padStart(2, '0');
    const t = new Date();
    const todayStr = `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;

    const list = await this.getAlarmaList();
    const due = list.filter((x: any) => {
      if (!x.dueDate || x.paused) return false;
      if (this.alertedToday(`${x.ticket}|${x.owner || ''}`, todayStr)) return false;
      const at = new Date(`${x.dueDate}T${x.dueTime || '09:00'}:00`).getTime();
      return at <= now;
    });
    // Reuniones (tareas tipo REUNIÓN) cuyo recordatorio ya llegó: dueño + responsable del equipo.
    const reuniones = this.reunionesDue(now, todayStr);
    // Tareas sin ticket (asignada a mí / sin finalizar y me toca): dedup PERMANENTE, no diario —
    // se calculan TODAS las vigentes para poder purgar del set lo que dejó de aplicar (housekeeping)
    // y así poder re-alertar si la misma situación vuelve a darse más adelante.
    //
    // `perfilListo`: si el perfil todavía no cargó, `equiposQueLidero()` sale vacío y las dos listas
    // de vigentes salen vacías por eso — NO porque de verdad no haya nada. Sincronizar el dedup con
    // una lista vacía "falsa" purgaría TODO lo ya visto (nada estaría en `vigentesAhora`), y en el
    // siguiente tick (ya con perfil cargado) todo volvería a verse "nuevo" y se re-alertaría — el
    // patrón intermitente reportado. Mientras el perfil no esté listo, se tratan como sin datos:
    // no se alerta nada de tareas ESTE tick, pero tampoco se toca el set persistido.
    const tareasAsigVig = this.perfilListo ? this.tareasAsignadasVigentes() : [];
    const tareasDoneVig = this.perfilListo ? this.tareasSinFinalizarVigentes() : [];
    // "No avisar hoy" (checkbox del propio popup, ver `silenciarTareaHoy`): dedup DIARIO aparte del
    // permanente — una tarea silenciada hoy no vuelve a aparecer aunque el dedup permanente la
    // marque como "nueva" por el motivo que sea.
    const tareasAsigNuevas = tareasAsigVig.filter(
      (r) => !this.alertedEver(r.key) && !this.alertedToday(`tarea|${r.item.tareaId}`, todayStr),
    );
    const tareasDoneNuevas = tareasDoneVig.filter(
      (r) => !this.alertedEver(r.key) && !this.alertedToday(`tarea|${r.item.tareaId}`, todayStr),
    );
    if (this.perfilListo) {
      this.syncAlertedEver(
        [...tareasAsigVig, ...tareasDoneVig].map((r) => r.key),
        [...tareasAsigNuevas, ...tareasDoneNuevas].map((r) => r.key),
      );
    }
    if ((!due.length && !reuniones.length && !tareasAsigNuevas.length && !tareasDoneNuevas.length) || this.alertOpen) return;

    this.markAlerted(
      [...due.map((x: any) => `${x.ticket}|${x.owner || ''}`), ...reuniones.map((r) => r.key)],
      todayStr,
    );
    // Buzón: reporta RECORDATORIO/REUNION al backend (best-effort, no bloquea el popup). Las 2 de
    // tarea NO se reportan aquí — el backend ya las generó él mismo al ocurrir la escritura.
    for (const x of due as any[]) {
      // Un recordatorio SIN ticket (clave sintética "REC-...") no tiene un código que el usuario
      // reconozca — no se incrusta en el título (mismo criterio que ya se aplicó al popup y al
      // hipervínculo del panel: "REC-..." no es información útil para quien lo lee).
      const sinTicket = String(x.ticket).startsWith('REC-');
      void this.notificaciones.reportar({
        tipo: 'RECORDATORIO', clave: `${x.ticket}|${x.owner || ''}`,
        titulo: sinTicket ? 'Recordatorio' : `Recordatorio: #${x.ticket}`,
        cuerpo: [x.clienteRaw, x.asunto].filter(Boolean).join(' — ') || x.nota || undefined,
        url: `#/pendientes?resaltar=${x.ticket}`,
      }).catch(() => {});
    }
    for (const r of reuniones) {
      // La reunión ES una tarea (tiene código TA-NNN): el buzón debe poder abrir su tarjeta igual
      // que TAREA_ASIGNADA/TAREA_SIN_FINALIZAR. Si además tiene link de videollamada, se agrega
      // como un segundo parámetro en la misma `url` (no hay campo propio en `Notificacion` para
      // esto, y no toca el backend) para poder ofrecer también el botón "Unirse".
      const tareaId = r.key.split('|')[1] || '';
      const join = r.item.link ? `&join=${encodeURIComponent(r.item.link)}` : '';
      void this.notificaciones.reportar({
        tipo: 'REUNION', clave: r.key,
        titulo: `Reunión: ${r.item.titulo || ''}`,
        cuerpo: r.item.hora ? `Hoy ${r.item.hora}` : undefined,
        url: `#/board?card=${tareaId}${join}`,
      }).catch(() => {});
    }
    this.playAlertSound();

    const items: ReminderItem[] = [
      ...due.map((x: any) => ({ kind: 'ticket' as const, ticket: x.ticket, clienteRaw: x.clienteRaw, asunto: x.asunto, nota: x.nota })),
      ...reuniones.map((r) => r.item),
      ...tareasAsigNuevas.map((r) => r.item),
      ...tareasDoneNuevas.map((r) => r.item),
    ];
    this.alertOpen = true;
    this.dialog
      .open(ReminderAlertDialog, {
        data: { items, onSilenciarHoy: (tareaId: string) => this.silenciarTareaHoy(tareaId) },
        width: '460px',
        maxWidth: '95vw',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((r) => {
        this.alertOpen = false;
        // "Ver" lleva a Pendientes resaltando SOLO los tickets que acaban de sonar (no las reuniones).
        if (r === 'ver') {
          const tks = items.filter((i) => i.kind !== 'reunion').map((i) => i.ticket).filter(Boolean);
          if (tks.length) this.router.navigate(['/pendientes'], { queryParams: { resaltar: tks.join(',') } });
        }
      });
  }

  /** Reuniones (tipo REUNIÓN) cuyo recordatorio ya llegó y me competen: soy el DUEÑO (assignee) o el
   *  RESPONSABLE del equipo (board en mis tableros). Ventana `[inicio - N min, inicio)` → auto-expira
   *  (no re-alerta al día siguiente). `recordatorioMin` (null → 20; 0 → sin recordatorio). */
  private reunionesDue(now: number, todayStr: string): { key: string; item: ReminderItem }[] {
    const me = String(this.auth.session()?.id || '').trim().toUpperCase();
    if (!me) return [];
    const esRE = this.auth.esResponsableEquipo();
    const misBoards = new Set(this.data.boards().map((b) => b.codigo));
    const out: { key: string; item: ReminderItem }[] = [];
    for (const s of this.data.stories()) {
      if (s.tipo !== 'REUNION' || !s.inicio) continue;
      const dueno = String(s.assignee || '').trim().toUpperCase();
      if (!(dueno === me || (esRE && s.board != null && misBoards.has(s.board)))) continue;
      const inicio = new Date(s.inicio).getTime();
      if (isNaN(inicio)) continue;
      const lead = s.recordatorioMin ?? 20;
      if (lead <= 0) continue; // 0 = sin recordatorio
      const dispararEn = inicio - lead * 60000;
      if (!(dispararEn <= now && now < inicio)) continue; // solo en la ventana antes del inicio
      const key = 'reunion|' + s.id;
      if (this.alertedToday(key, todayStr)) continue;
      out.push({
        key,
        item: { kind: 'reunion', titulo: s.tema || s.title || 'Reunión', hora: String(s.inicio).slice(11, 16), link: s.link || undefined },
      });
    }
    return out;
  }

  /**
   * TODAS las tareas SIN ticket asignadas A MÍ ahora mismo (vistas o no) — sin importar cuándo se
   * crearon o asignaron: no hay una "hora" de la que colgar una ventana como en una reunión, así que
   * el filtro de qué es NUEVO se hace en `checkReminders()` contra el dedup permanente. Devolver
   * también lo ya visto permite hacer housekeeping: si la tarea se reasigna a otra persona (o se
   * termina, ver check de `status` abajo), esta combinación deja de estar "vigente" y su clave se
   * purga, para poder re-alertar si algún día vuelve a asignárseme la misma tarea.
   */
  private tareasAsignadasVigentes(): { key: string; item: ReminderItem }[] {
    const me = String(this.auth.session()?.id || '').trim().toUpperCase();
    if (!me) return [];
    const out: { key: string; item: ReminderItem }[] = [];
    for (const s of this.data.stories()) {
      // Una tarea ya ACABADA (columna Entregado) no es "trabajo nuevo" que avisar — para eso ya
      // existe la alerta aparte de "sin finalizar" (`tareasSinFinalizarVigentes`, dirigida a quien
      // dirige el equipo, no al asignado). Sin este corte, una tarea que llega directo a Entregado
      // (o que ya estaba terminada antes de que este chequeo corriera la primera vez) igual alertaba
      // "Nueva tarea asignada" una vez, sin sentido para algo que ya no requiere acción.
      if (s.ticket || !s.assignee || s.status === 'done') continue;
      const asignado = String(s.assignee).trim().toUpperCase();
      if (asignado !== me) continue;
      out.push({
        key: `tarea-asig|${s.id}|${asignado}`,
        item: { kind: 'tarea-asignada', tareaId: s.id, tareaTitulo: s.title, tareaCliente: s.clientName },
      });
    }
    return out;
  }

  /**
   * TODAS las tareas SIN ticket que están AHORA en "Entregado" (done) sin marcarse "Finalizado"
   * (`approved === false`) y me tocan a mí — el único caso que el cutoff de limpieza de la columna
   * Done no cubre, así que puede quedarse ahí indefinidamente sin que nadie lo note. Avisa a quien
   * DIRIGE el equipo de esa tarea: `perfil.equiposQueLidero()` ya cubre tanto alcance EQUIPO como
   * REGIONAL (la propia "equipos-clientes" del backend expande un responsable regional a todos los
   * equipos de su regional). Igual que la anterior, devuelve TODO lo vigente (visto o no) para poder
   * purgar en `checkReminders()` lo que deja de aplicar (se finaliza) y así re-alertar si se reabre.
   */
  private tareasSinFinalizarVigentes(): { key: string; item: ReminderItem }[] {
    const misEquipos = new Set(this.perfil.equiposQueLidero().map((e) => e.codigo));
    if (!misEquipos.size) return [];
    const out: { key: string; item: ReminderItem }[] = [];
    for (const s of this.data.stories()) {
      if (s.status !== 'done' || s.ticket || s.approved) continue;
      if (!s.board || !misEquipos.has(s.board)) continue;
      out.push({
        key: `tarea-done|${s.id}`,
        item: { kind: 'tarea-sin-finalizar', tareaId: s.id, tareaTitulo: s.title, tareaCliente: s.clientName },
      });
    }
    return out;
  }

  /**
   * Novedades sin ver → badge del ítem "Tickets". **Solo para quien dirige**: el contador es una
   * señal de seguimiento del equipo, no del trabajo propio, así que al consultor no le aporta y le
   * mete ruido en el menú. El POPUP no cambia: sigue saltándole al responsable y al consultor
   * asignado al ticket, que es donde está el aviso accionable.
   */
  /** Avatar del usuario logueado: su COLOR IDENTIFICATIVO (el mismo que en el board, sus
   *  tickets, vacaciones y el semanal), con la tinta calculada. Antes usaba el color que se
   *  fijaba al INICIAR SESIÓN, así que no cambiaba al elegir otro ni coincidía con el resto. */
  readonly miAvatar = computed(() => this.colores.avatar(String(this.auth.session()?.id || '')));

  readonly nuevosConteo = this.nuevosTickets.conteo;
  readonly mostrarNuevos = computed(
    () => (this.auth.esAdminPlataforma() || this.auth.esResponsableEquipo()) && this.nuevosTickets.conteo() > 0,
  );

  private ntAlertOpen = false;
  private ultimoNt = 0;
  /**
   * Poll (~cada 60s vía el tick de 30s throttled) de NOVEDADES: ticket NUEVO o con ACTIVIDAD nueva
   * → popup + sonido, y el badge de "Tickets".
   *
   * A quién le toca cada aviso: al **responsable del equipo dueño del cliente** y al **consultor
   * asignado** al ticket. Por eso corre para TODOS (antes solo para responsables) y el alcance por
   * clientes sale de `equiposQueLidero`, no de `equiposRevisar`: un ESPECIALISTA asignado a un equipo
   * lo REVISA pero no lo dirige, y estaba recibiendo las novedades de ese equipo sin que le tocaran.
   */
  private async checkNuevosTickets(): Promise<void> {
    if (this.ntAlertOpen) return;
    const now = Date.now();
    if (this.ultimoNt && now - this.ultimoNt < 55000) return; // ~1 consulta/min
    this.ultimoNt = now;
    const ids = equipoClientIdsDe(this.perfil.equiposQueLidero(), this.helpdesk.clients());
    const miHid = String(this.auth.session()?.id || '').trim();
    if (!ids.length && !miHid) return;
    const avisos = await this.nuevosTickets.revisar(ids, miHid); // actualiza el badge + devuelve lo no popeado
    if (!avisos.length) return;
    // Buzón: clave más simple que el dedup del popup (sin la "señal" de modificación, no expuesta
    // fuera de NuevosTicketsService) — una segunda actividad sobre el mismo ticket no duplica fila
    // si la anterior sigue sin leerse; el popup sigue re-avisando igual, son dedups independientes.
    for (const a of avisos) {
      void this.notificaciones.reportar({
        tipo: 'TICKET_NOVEDAD', clave: `${a.ticket}:${a.motivo}`,
        titulo: a.motivo === 'actividad' ? `Novedad en #${a.ticket}` : `Ticket nuevo: #${a.ticket}`,
        cuerpo: [a.clienteRaw, a.asunto].filter(Boolean).join(' — ') || undefined,
        url: `#/tickets?resaltar=${a.ticket}`,
      }).catch(() => {});
    }
    this.playAlertSound();
    const items: ReminderItem[] = avisos.map((a) => ({
      kind: 'ticket-nuevo' as const, ticket: a.ticket, clienteRaw: a.clienteRaw, asunto: a.asunto, motivo: a.motivo,
    }));
    this.ntAlertOpen = true;
    this.dialog
      .open(ReminderAlertDialog, { data: { items }, width: '460px', maxWidth: '95vw', autoFocus: false })
      .afterClosed()
      .subscribe(() => {
        this.ntAlertOpen = false;
      });
  }

  /** Crea (perezoso) el AudioContext del sonido de alerta. */
  private ensureAudio(): AudioContext | null {
    if (this.audioCtx) return this.audioCtx;
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return null;
    this.audioCtx = new Ctx();
    return this.audioCtx;
  }

  /** Sonido "ding-dong" de la alerta (Web Audio, sin archivo). */
  private playAlertSound(): void {
    try {
      const ctx = this.ensureAudio();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const tones: [number, number][] = [ [880, 0], [660, 0.18] ];
      for (const [freq, offset] of tones) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const t0 = ctx.currentTime + offset;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.35, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.55);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.6);
      }
    } catch {
      /* autoplay bloqueado o sin Web Audio: la alerta visual igual aparece */
    }
  }

  /** Abre el diálogo de perfil (datos + foto personalizable). */
  abrirPerfil(): void {
    this.dialog.open(PerfilDialog, { width: '380px', maxWidth: '95vw', autoFocus: false });
  }

  /** Iniciales del nombre (avatar sin foto). El código del API ya no se muestra. */
  iniciales(nombre: string | null | undefined): string {
    const n = (nombre || '').trim();
    if (!n) return '?';
    return n.split(/\s+/).slice(0, 2).map((p) => p[0] || '').join('').toUpperCase() || '?';
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
