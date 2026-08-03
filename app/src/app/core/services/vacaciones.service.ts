import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/**
 * Período de vacaciones / permiso de un empleado (calendario de la sección Vacaciones).
 * `diasVacacion = round(diasLaborables * 1.36)` (factor de la empresa). El nombre del empleado
 * viene resuelto del backend (regla #8: nunca el código como texto visible); `usuarioHid` solo
 * se usa internamente (color estable, saber si es "mío").
 */
export interface Vacacion {
  id: number;
  usuarioHid: string | null;
  empleado: string | null;
  equipoId: number | null;
  equipo: string | null;
  regional: string | null;
  fechaInicio: string; // YYYY-MM-DD
  fechaFin: string;     // YYYY-MM-DD
  diasLaborables: number;
  diasVacacion: number;
  tipo: 'VACACIONES' | 'PERMISO';
  estado: string;
  nota: string | null;
  registradoPor: string | null;
  creadoEn: string | null;
}

export interface VacacionInput {
  usuarioHid: string;
  fechaInicio: string;
  fechaFin: string;
  diasLaborables: number;
  tipo: 'VACACIONES' | 'PERMISO';
  nota?: string;
}

/** Feriado / día no laborable de la empresa (nacional). Puede ser un día o un rango (puente). */
export interface Feriado {
  id: number;
  nombre: string;
  fechaInicio: string; // YYYY-MM-DD
  fechaFin: string;    // YYYY-MM-DD
  registradoPor: string | null;
  creadoEn: string | null;
}

/**
 * Cliente del API de Vacaciones (Quarkus). Lectura abierta (todos ven el calendario);
 * escritura gateada en el backend (propias ∪ responsable de equipo ∪ admin). Actor en
 * `X-Actor-Hid`, igual que el resto de la app en modo Quarkus.
 */
@Injectable({ providedIn: 'root' })
export class VacacionesService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = environment.quarkusApiUrl;

  private actorOpts() {
    const hid = this.auth.session()?.id;
    return hid ? { headers: { 'X-Actor-Hid': hid } } : {};
  }

  /** Lista las vacaciones: sin `equipoId` = NACIONAL (todas); con `equipoId` = solo ese equipo. */
  listar(equipoId?: number | null) {
    const q = equipoId != null ? `?equipo=${equipoId}` : '';
    return firstValueFrom(this.http.get<Vacacion[]>(`${this.base}/api/vacaciones${q}`, this.actorOpts()));
  }

  crear(b: VacacionInput) {
    return firstValueFrom(this.http.post<Vacacion>(`${this.base}/api/vacaciones`, b, this.actorOpts()));
  }

  editar(id: number, b: VacacionInput) {
    return firstValueFrom(this.http.put<Vacacion>(`${this.base}/api/vacaciones/${id}`, b, this.actorOpts()));
  }

  eliminar(id: number) {
    return firstValueFrom(this.http.delete<void>(`${this.base}/api/vacaciones/${id}`, this.actorOpts()));
  }

  // ── Feriados (días no laborables de la empresa; escritura solo ADMIN) ──
  listarFeriados() {
    return firstValueFrom(this.http.get<Feriado[]>(`${this.base}/api/feriados`, this.actorOpts()));
  }
  crearFeriado(b: { nombre: string; fechaInicio: string; fechaFin: string }) {
    return firstValueFrom(this.http.post<Feriado>(`${this.base}/api/feriados`, b, this.actorOpts()));
  }
  eliminarFeriado(id: number) {
    return firstValueFrom(this.http.delete<void>(`${this.base}/api/feriados/${id}`, this.actorOpts()));
  }
}
