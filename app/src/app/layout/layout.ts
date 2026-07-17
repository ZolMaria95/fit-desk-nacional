import { Component, DestroyRef, ElementRef, afterNextRender, afterRenderEffect, computed, inject, signal, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filter, map } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { DataService } from '../core/services/data.service';
import { HelpdeskService } from '../core/services/helpdesk.service';
import { ShellService } from '../core/services/shell.service';
import { PerfilService } from '../core/services/perfil.service';
import { PerfilDialog } from '../features/perfil/perfil-dialog';
import { ReminderAlertDialog, ReminderItem } from '../features/pendientes/reminder-alert-dialog/reminder-alert-dialog';

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
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
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
  /** Estado manual del drawer (botón ☰) cuando es overlay; en modo fijo se ignora. */
  readonly drawerOpen = signal(false);
  /** Abierto = fijo (side, siempre abierto) o abierto manualmente en overlay. Derivar
   *  `opened` y `mode` de `fixed()` juntos evita que el drawer se abra en modo `over`
   *  durante la transición (lo que dejaba el contenido `inert` en zoneless). */
  readonly opened = computed(() => this.fixed() || this.drawerOpen());

  /** Contenido del shell (para limpiar un `inert` que Material pudo dejar pegado). */
  private readonly shellContent = viewChild<ElementRef<HTMLElement>>('shellContent');

  constructor() {
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
    // Recordatorios de tickets pendientes: revisa cada 30s para que la alerta salte
    // cerca de la hora exacta (la lista vive en memoria, sin costo de red).
    const timer = setInterval(() => this.checkReminders(), 30 * 1000);
    this.destroyRef.onDestroy(() => clearInterval(timer));

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

    // En overlay, cerrar el drawer al navegar.
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (!this.fixed()) this.drawerOpen.set(false);
      });
  }

  private static readonly ALERTED_KEY = 'fit-daily_alerted';
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
    if (!due.length || this.alertOpen) return;

    this.markAlerted(due.map((x: any) => `${x.ticket}|${x.owner || ''}`), todayStr);
    this.playAlertSound();

    const items: ReminderItem[] = due.map((x: any) => ({ ticket: x.ticket, clienteRaw: x.clienteRaw, asunto: x.asunto, nota: x.nota }));
    this.alertOpen = true;
    this.dialog
      .open(ReminderAlertDialog, { data: { items }, width: '460px', maxWidth: '95vw', autoFocus: false })
      .afterClosed()
      .subscribe((r) => {
        this.alertOpen = false;
        // Lleva a Pendientes resaltando los tickets que acaban de sonar.
        if (r === 'ver') {
          this.router.navigate(['/pendientes'], { queryParams: { resaltar: items.map((i) => i.ticket).join(',') } });
        }
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
