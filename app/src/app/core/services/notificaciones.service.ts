import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/**
 * Notificación del buzón. TAREA_ASIGNADA/TAREA_SIN_FINALIZAR/TRANSFERENCIA_PENDIENTE/
 * SOLICITUD_PENDIENTE las genera el backend solo (en el momento de la escritura);
 * RECORDATORIO/REUNION/TICKET_NOVEDAD las reporta este servicio cuando `layout.ts` las detecta
 * con su propio chequeo periódico (mismo cálculo que ya dispara el popup).
 */
export interface Notificacion {
  id: number;
  tipo: 'RECORDATORIO' | 'REUNION' | 'TAREA_ASIGNADA' | 'TAREA_SIN_FINALIZAR' | 'TICKET_NOVEDAD'
    | 'TRANSFERENCIA_PENDIENTE' | 'SOLICITUD_PENDIENTE';
  titulo: string;
  cuerpo: string | null;
  url: string | null;
  leida: boolean;
  creadoEn: string | null;
  leidoEn: string | null;
}

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = environment.quarkusApiUrl;

  private actorOpts() {
    const hid = this.auth.session()?.id;
    return hid ? { headers: { 'X-Actor-Hid': hid } } : {};
  }

  /** Conteo de no leídas, para el badge de la campanita — lo mantiene al día `layout.ts`. */
  readonly noLeidas = signal(0);

  listar(soloNoLeidas = false) {
    const opts = this.actorOpts();
    const params = soloNoLeidas ? { ...opts, params: { leidas: 'false' } } : opts;
    return firstValueFrom(this.http.get<Notificacion[]>(`${this.base}/api/notificaciones`, params));
  }

  /** Reporta RECORDATORIO/REUNION/TICKET_NOVEDAD (las únicas que el backend acepta por esta vía). */
  reportar(b: { tipo: 'RECORDATORIO' | 'REUNION' | 'TICKET_NOVEDAD'; clave: string; titulo: string; cuerpo?: string; url?: string }) {
    return firstValueFrom(this.http.post(`${this.base}/api/notificaciones`, b, this.actorOpts()));
  }

  marcarLeida(id: number) {
    return firstValueFrom(this.http.post<Notificacion>(`${this.base}/api/notificaciones/${id}/leida`, {}, this.actorOpts()));
  }

  marcarTodasLeidas() {
    return firstValueFrom(this.http.post<{ marcadas: number }>(`${this.base}/api/notificaciones/leidas`, {}, this.actorOpts()));
  }

  /** Refresca `noLeidas` (badge). Best-effort: un fallo no debe romper el resto del polling. */
  async refrescarNoLeidas(): Promise<void> {
    try {
      const lista = await this.listar(true);
      this.noLeidas.set(lista.length);
    } catch {
      /* silencioso */
    }
  }
}
