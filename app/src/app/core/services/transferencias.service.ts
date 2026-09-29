import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/** Transferencia de una Tarea entre equipos (request-based). La Tarea NO cambia de board. */
export interface Transferencia {
  id: number;
  tareaCodigo: string;
  tareaTitulo: string | null;
  /** N° de ticket del HelpDesk asociado a la tarea (si nace de un ticket); null si no. */
  ticket: string | null;
  clienteTarea: string | null;
  equipoOrigenId: number | null;
  equipoOrigen: string | null;
  equipoDestinoId: number | null;
  equipoDestino: string | null;
  despachadorOrigen: string | null;
  despachadorDestino: string | null;
  asignadoDestinoHid: string | null;
  asignadoDestino: string | null;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'COMPLETADA' | 'CANCELADA';
  motivo: string | null;
  creadoEn: string | null;
  resueltoEn: string | null;
}

/** Solicitud del Especialista al Responsable de Equipo (escala reasignar/transferir). */
export interface Solicitud {
  id: number;
  tareaCodigo: string;
  tareaTitulo: string | null;
  /**
   * N° de ticket del HelpDesk asociado a la tarea; null si es una tarea local.
   * OPCIONAL a propósito: un backend anterior a este cambio no emite la clave (`undefined`), así que
   * frontend y backend se pueden desplegar en cualquier orden (sin el campo, no se pinta el chip).
   */
  ticket?: string | null;
  equipoTarea: string | null;
  solicitanteHid: string | null;
  solicitante: string | null;
  tipo: 'REASIGNACION' | 'TRANSFERENCIA';
  motivo: string | null;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA' | 'CANCELADA';
  equipoDestinoId: number | null;
  equipoDestino: string | null;
  asignadoSugeridoHid: string | null;
  asignadoSugerido: string | null;
  resueltaPor: string | null;
  transferenciaId: number | null;
  creadoEn: string | null;
  resueltoEn: string | null;
}

export interface MiembroEquipo { helpdeskUserId: string | null; codigoLocal: string | null; nombre: string; }

/** Mensaje entre equipos sobre una tarea/ticket (un RE escribe al RE del equipo que la desarrolla). */
export interface Mensaje {
  id: number;
  tareaCodigo: string;
  tareaTitulo: string | null;
  ticket: string | null;
  equipoTarea: string | null;
  asignado: string | null;
  deHid: string | null;
  de: string | null;
  texto: string | null;
  visto: boolean;
  creadoEn: string | null;
}

/**
 * Cliente del API de envío de tareas entre equipos (Transferencia + Solicitud), en Quarkus.
 * Solo aplica en modo Quarkus. El actor va en el header `X-Actor-Hid` (interino, hasta la
 * identidad por token), igual que Administración.
 */
@Injectable({ providedIn: 'root' })
export class TransferenciasService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = environment.quarkusApiUrl;

  private actorOpts() {
    const hid = this.auth.session()?.id;
    return hid ? { headers: { 'X-Actor-Hid': hid } } : {};
  }
  /** Como `actorOpts` + el token del HelpDesk: aceptar una transferencia / aprobar una reasignación
   *  asigna también el TICKET en el HelpDesk (lo hace el backend con el token del usuario). El
   *  interceptor solo pone `Authorization` en `/api/v1`, por eso va explícito aquí. */
  private actorOptsConToken() {
    const headers: Record<string, string> = {};
    const hid = this.auth.session()?.id;
    if (hid) headers['X-Actor-Hid'] = hid;
    const t = this.auth.token;
    if (t) headers['Authorization'] = `Bearer ${t}`;
    return { headers };
  }

  // ── Transferencias ──
  /** Crea una transferencia. Camino clásico: `tareaCodigo` (tarea ya en un board). Camino
   *  desde un ticket sin tarea: `ticket` (+ `titulo`, `clienteCodigo`); el backend crea la
   *  tarea OCULTA en el board del remitente y aparece al aceptarse. */
  crearTransferencia(b: {
    tareaCodigo?: string;
    ticket?: string;
    titulo?: string;
    clienteCodigo?: string;
    equipoOrigenId?: number;
    equipoDestinoId: number;
    motivo?: string;
  }) {
    return firstValueFrom(this.http.post<Transferencia>(`${this.base}/api/transferencias`, b, this.actorOpts()));
  }
  transferenciasEntrantes() {
    return firstValueFrom(this.http.get<Transferencia[]>(`${this.base}/api/transferencias/entrantes`, this.actorOpts()));
  }
  transferenciasSalientes() {
    return firstValueFrom(this.http.get<Transferencia[]>(`${this.base}/api/transferencias/salientes`, this.actorOpts()));
  }
  aceptarTransferencia(id: number, asignadoHid: string) {
    return firstValueFrom(this.http.post<Transferencia>(`${this.base}/api/transferencias/${id}/aceptar`, { asignadoHid }, this.actorOptsConToken()));
  }
  rechazarTransferencia(id: number, motivo?: string) {
    return firstValueFrom(this.http.post<Transferencia>(`${this.base}/api/transferencias/${id}/rechazar`, { motivo }, this.actorOpts()));
  }
  /** Cancela un envío PROPIO mientras sigue PENDIENTE (lo autoriza quien gobierna el equipo origen). */
  cancelarTransferencia(id: number, motivo?: string) {
    return firstValueFrom(this.http.post<Transferencia>(`${this.base}/api/transferencias/${id}/cancelar`, { motivo }, this.actorOpts()));
  }
  miembrosEquipo(equipoId: number) {
    return firstValueFrom(this.http.get<MiembroEquipo[]>(`${this.base}/api/transferencias/equipo/${equipoId}/miembros`));
  }
  /** Trabajo YA aceptado dirigido a mis equipos (transferencias COMPLETADAS): qué lleva mi gente de otros equipos. */
  trabajoAceptado() {
    return firstValueFrom(this.http.get<Transferencia[]>(`${this.base}/api/transferencias/aceptadas`, this.actorOpts()));
  }
  /** Roster de los equipos que gobierno (hids de sus miembros) — para el toggle "Mi equipo" del board. */
  miEquipoMiembros() {
    return firstValueFrom(this.http.get<MiembroEquipo[]>(`${this.base}/api/transferencias/mi-equipo/miembros`, this.actorOpts()));
  }

  // ── Solicitudes (Especialista → Responsable de Equipo) ──
  /** Crea una solicitud (Especialista → RE). Camino clásico: `tareaCodigo` (tarea suya).
   *  Camino desde un ticket sin tarea: `ticket` (+ `titulo`, `clienteCodigo`); el backend crea
   *  la tarea OCULTA en el board del especialista y aparece al aprobar/aceptar. */
  crearSolicitud(b: {
    tareaCodigo?: string;
    ticket?: string;
    titulo?: string;
    clienteCodigo?: string;
    tipo: 'REASIGNACION' | 'TRANSFERENCIA';
    motivo?: string;
    equipoDestinoId?: number;
    asignadoSugeridoHid?: string;
  }) {
    return firstValueFrom(this.http.post<Solicitud>(`${this.base}/api/solicitudes`, b, this.actorOpts()));
  }
  solicitudesEntrantes() {
    return firstValueFrom(this.http.get<Solicitud[]>(`${this.base}/api/solicitudes/entrantes`, this.actorOpts()));
  }
  misSolicitudes() {
    return firstValueFrom(this.http.get<Solicitud[]>(`${this.base}/api/solicitudes/mias`, this.actorOpts()));
  }
  aprobarSolicitud(id: number, b?: { asignadoHid?: string; equipoDestinoId?: number }) {
    return firstValueFrom(this.http.post<Solicitud>(`${this.base}/api/solicitudes/${id}/aprobar`, b ?? {}, this.actorOptsConToken()));
  }
  rechazarSolicitud(id: number, motivo?: string) {
    return firstValueFrom(this.http.post<Solicitud>(`${this.base}/api/solicitudes/${id}/rechazar`, { motivo }, this.actorOpts()));
  }
  /** Cancela una solicitud PROPIA mientras sigue PENDIENTE (solo quien la creó). */
  cancelarSolicitud(id: number, motivo?: string) {
    return firstValueFrom(this.http.post<Solicitud>(`${this.base}/api/solicitudes/${id}/cancelar`, { motivo }, this.actorOpts()));
  }

  /** Total de pendientes de la Bandeja (transferencias + solicitudes + mensajes entrantes),
   *  para el badge de notificación del menú. Lo pobla el Layout y lo mantiene la Bandeja. */
  readonly pendientesBandeja = signal(0);

  /** Refresca el contador de pendientes de la Bandeja (best-effort; vacío para no-RE). */
  async refrescarPendientesBandeja(): Promise<void> {
    try {
      const [t, s, m] = await Promise.all([
        this.transferenciasEntrantes(),
        this.solicitudesEntrantes(),
        this.mensajesEntrantes(),
      ]);
      this.pendientesBandeja.set(t.length + s.length + m.length);
    } catch {
      /* best-effort: si falla, se queda el último valor */
    }
  }

  // ── Mensajes entre equipos (sobre una tarea/ticket) ──
  crearMensaje(b: { tareaCodigo: string; texto?: string }) {
    return firstValueFrom(this.http.post<Mensaje>(`${this.base}/api/mensajes`, b, this.actorOpts()));
  }
  mensajesEntrantes() {
    return firstValueFrom(this.http.get<Mensaje[]>(`${this.base}/api/mensajes/entrantes`, this.actorOpts()));
  }
  marcarMensajeVisto(id: number) {
    return firstValueFrom(this.http.post<Mensaje>(`${this.base}/api/mensajes/${id}/visto`, {}, this.actorOpts()));
  }
}
