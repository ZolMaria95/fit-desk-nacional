import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/** Transferencia de una Tarea entre equipos (request-based). La Tarea NO cambia de board. */
export interface Transferencia {
  id: number;
  tareaCodigo: string;
  tareaTitulo: string | null;
  clienteTarea: string | null;
  equipoOrigenId: number | null;
  equipoOrigen: string | null;
  equipoDestinoId: number | null;
  equipoDestino: string | null;
  despachadorOrigen: string | null;
  despachadorDestino: string | null;
  asignadoDestinoHid: string | null;
  asignadoDestino: string | null;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'COMPLETADA';
  motivo: string | null;
  creadoEn: string | null;
  resueltoEn: string | null;
}

/** Solicitud del Especialista al Responsable de Equipo (escala reasignar/transferir). */
export interface Solicitud {
  id: number;
  tareaCodigo: string;
  tareaTitulo: string | null;
  equipoTarea: string | null;
  solicitanteHid: string | null;
  solicitante: string | null;
  tipo: 'REASIGNACION' | 'TRANSFERENCIA';
  motivo: string | null;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
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

  // ── Transferencias ──
  crearTransferencia(b: { tareaCodigo: string; equipoDestinoId: number; motivo?: string }) {
    return firstValueFrom(this.http.post<Transferencia>(`${this.base}/api/transferencias`, b, this.actorOpts()));
  }
  transferenciasEntrantes() {
    return firstValueFrom(this.http.get<Transferencia[]>(`${this.base}/api/transferencias/entrantes`, this.actorOpts()));
  }
  transferenciasSalientes() {
    return firstValueFrom(this.http.get<Transferencia[]>(`${this.base}/api/transferencias/salientes`, this.actorOpts()));
  }
  aceptarTransferencia(id: number, asignadoHid: string) {
    return firstValueFrom(this.http.post<Transferencia>(`${this.base}/api/transferencias/${id}/aceptar`, { asignadoHid }, this.actorOpts()));
  }
  rechazarTransferencia(id: number, motivo?: string) {
    return firstValueFrom(this.http.post<Transferencia>(`${this.base}/api/transferencias/${id}/rechazar`, { motivo }, this.actorOpts()));
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
  crearSolicitud(b: { tareaCodigo: string; tipo: 'REASIGNACION' | 'TRANSFERENCIA'; motivo?: string; equipoDestinoId?: number; asignadoSugeridoHid?: string }) {
    return firstValueFrom(this.http.post<Solicitud>(`${this.base}/api/solicitudes`, b, this.actorOpts()));
  }
  solicitudesEntrantes() {
    return firstValueFrom(this.http.get<Solicitud[]>(`${this.base}/api/solicitudes/entrantes`, this.actorOpts()));
  }
  misSolicitudes() {
    return firstValueFrom(this.http.get<Solicitud[]>(`${this.base}/api/solicitudes/mias`, this.actorOpts()));
  }
  aprobarSolicitud(id: number, b?: { asignadoHid?: string; equipoDestinoId?: number }) {
    return firstValueFrom(this.http.post<Solicitud>(`${this.base}/api/solicitudes/${id}/aprobar`, b ?? {}, this.actorOpts()));
  }
  rechazarSolicitud(id: number, motivo?: string) {
    return firstValueFrom(this.http.post<Solicitud>(`${this.base}/api/solicitudes/${id}/rechazar`, { motivo }, this.actorOpts()));
  }
}
