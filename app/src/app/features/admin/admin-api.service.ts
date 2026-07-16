import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

export interface Regional { id: number; codigo: string; nombre: string; activo: boolean; }
export interface Equipo {
  id: number; codigo: string; nombre: string; activo: boolean; regionalId: number | null; regionalNombre?: string;
  responsableHelpdeskUserId?: string | null; responsableNombre?: string | null;
}
export interface Cliente {
  id: number; codigo: string; nombre: string; helpdeskClientId: string | null;
  color: string | null; activo: boolean; equipoResponsableId: number | null; equipoResponsableNombre?: string;
}
export interface Rol { id: number; codigo: string; nombre: string; descripcion?: string; }
export interface Asignacion {
  id: number; usuarioId: number; usuarioNombre: string; helpdeskUserId: string | null;
  rolId: number; rolCodigo: string; rolNombre: string;
  alcanceTipo: string; alcanceObjetivoId: number | null; alcanceNombre: string | null;
  vigenteDesde: string | null; vigenteHasta: string | null; activo: boolean;
}
export interface UsuarioAdmin {
  id: number; codigoLocal: string; helpdeskUserId: string | null; nombre: string;
  alias: string | null; color: string | null; activo: boolean; roles: Asignacion[];
}
export interface NuevaAsignacion {
  // Usuario por id local, o por empleado del HelpDesk (se materializa la fila usuario).
  usuarioId?: number; helpdeskUserId?: string; usuarioNombre?: string;
  rolId: number; alcanceTipo: 'EQUIPO' | 'CLIENTE' | 'REGIONAL' | 'GLOBAL';
  alcanceEquipoId?: number; alcanceClienteId?: number; alcanceRegionalId?: number;
  vigenteDesde?: string; vigenteHasta?: string;
}
/** Body de edición: como el alta pero `vigenteHasta` admite null (para limpiar/finalizar). */
export type EditarAsignacion = Omit<Partial<NuevaAsignacion>, 'vigenteHasta'> & { vigenteHasta?: string | null };

/**
 * Cliente HTTP del API de Administración de Quarkus (nacionalización por datos).
 * Solo aplica en modo Quarkus (el backend gestiona el modelo relacional).
 */
@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = environment.quarkusApiUrl;

  /** Identidad del actor para el backend (interino, hasta tener identidad por token). */
  private actorOpts() {
    const hid = this.auth.session()?.id;
    return hid ? { headers: { 'X-Actor-Hid': hid } } : {};
  }

  // ── Regionales ──
  regionales() { return firstValueFrom(this.http.get<Regional[]>(`${this.base}/api/regionales`)); }
  crearRegional(b: { codigo: string; nombre: string }) { return firstValueFrom(this.http.post<Regional>(`${this.base}/api/regionales`, b)); }
  actualizarRegional(id: number, b: Partial<Regional>) { return firstValueFrom(this.http.put<Regional>(`${this.base}/api/regionales/${id}`, b)); }
  eliminarRegional(id: number) { return firstValueFrom(this.http.delete(`${this.base}/api/regionales/${id}`, this.actorOpts())); }

  // ── Equipos ──
  equipos() { return firstValueFrom(this.http.get<Equipo[]>(`${this.base}/api/admin/equipos`)); }
  crearEquipo(b: { regionalId: number; codigo: string; nombre: string; responsableHelpdeskUserId?: string; responsableNombre?: string }) {
    return firstValueFrom(this.http.post<Equipo>(`${this.base}/api/admin/equipos`, b));
  }
  actualizarEquipo(id: number, b: Record<string, unknown>) { return firstValueFrom(this.http.put<Equipo>(`${this.base}/api/admin/equipos/${id}`, b)); }

  // ── Clientes ──
  clientes() { return firstValueFrom(this.http.get<Cliente[]>(`${this.base}/api/admin/clientes`)); }
  crearCliente(b: { codigo: string; nombre: string; equipoResponsableId: number; helpdeskClientId?: string; color?: string }) {
    return firstValueFrom(this.http.post<Cliente>(`${this.base}/api/admin/clientes`, b));
  }
  actualizarCliente(id: number, b: Record<string, unknown>) { return firstValueFrom(this.http.put<Cliente>(`${this.base}/api/admin/clientes/${id}`, b)); }
  eliminarCliente(id: number) { return firstValueFrom(this.http.delete(`${this.base}/api/admin/clientes/${id}`)); }

  // ── Usuarios, Roles, Asignaciones ──
  usuarios() { return firstValueFrom(this.http.get<UsuarioAdmin[]>(`${this.base}/api/admin/usuarios`)); }
  roles() { return firstValueFrom(this.http.get<Rol[]>(`${this.base}/api/catalogos/roles`)); }
  asignaciones() { return firstValueFrom(this.http.get<Asignacion[]>(`${this.base}/api/admin/asignaciones`)); }
  crearAsignacion(b: NuevaAsignacion) { return firstValueFrom(this.http.post<Asignacion>(`${this.base}/api/admin/asignaciones`, b, this.actorOpts())); }
  actualizarAsignacion(id: number, b: EditarAsignacion) {
    return firstValueFrom(this.http.put<Asignacion>(`${this.base}/api/admin/asignaciones/${id}`, b, this.actorOpts()));
  }
  eliminarAsignacion(id: number) { return firstValueFrom(this.http.delete(`${this.base}/api/admin/asignaciones/${id}`, this.actorOpts())); }
}
