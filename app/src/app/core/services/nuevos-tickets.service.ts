import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { HelpdeskService } from './helpdesk.service';

/** Un aviso de novedad en un ticket del equipo (para el popup + el badge). */
export interface TicketAviso {
  ticket: string;
  clienteRaw: string;
  asunto: string;
  /** 'nuevo' = recién creado; 'actividad' = existía y cambió su fecha de modificación (comentario/cambio). */
  motivo: 'nuevo' | 'actividad';
}

/**
 * Detecta NOVEDADES en los tickets de los clientes del equipo, para avisar a los RESPONSABLES:
 *   - **nuevo**: `entry_date` (creación) posterior a la marca de agua de creación.
 *   - **actividad**: `modified_date` posterior a la marca de agua de modificación (p. ej. un nuevo
 *     comentario o cambio) en un ticket que ya existía.
 * Expone `conteo` (badge del ítem "Tickets") y `revisar()` devuelve los avisos que faltan popear
 * (el Layout dispara el popup + sonido). Dos marcas de agua persistidas por usuario → la 1ª corrida
 * hace BASELINE (no alerta por el histórico) y no re-alerta entre recargas/sesiones. `marcarVistos()`
 * (al ver la pestaña Equipo) avanza las marcas y limpia el badge.
 */
@Injectable({ providedIn: 'root' })
export class NuevosTicketsService {
  private readonly hd = inject(HelpdeskService);
  private readonly auth = inject(AuthService);

  /** Novedades sin ver (nuevos + con actividad) → badge del ítem "Tickets" del menú. */
  readonly conteo = signal(0);

  private ultimoMaxEntry = 0;
  private ultimoMaxMod = 0;
  /** dedup del POPUP (sesión): `${ticket}:${motivo}:${señalMs}` ya popeados. */
  private readonly alertados = new Set<string>();

  private key(sub: 'entry' | 'mod'): string {
    const uid = String(this.auth.session()?.id || '').trim().toUpperCase();
    return `fit-daily_nt_${sub}_${uid || 'anon'}`;
  }
  private getWm(sub: 'entry' | 'mod'): number {
    const v = Number(localStorage.getItem(this.key(sub)) || 0);
    return Number.isFinite(v) ? v : 0;
  }
  private setWm(sub: 'entry' | 'mod', ms: number): void {
    try { localStorage.setItem(this.key(sub), String(ms)); } catch { /* localStorage no disponible */ }
  }
  /** fecha → ms; NaN (formato raro/vacío) → 0 (ese ticket NO cuenta como novedad: seguro). */
  private ms(d: string | undefined): number {
    const t = Date.parse(String(d || ''));
    return Number.isNaN(t) ? 0 : t;
  }

  /**
   * Revisa la 1ª página de tickets del equipo (sin efectos sobre la vista). Actualiza `conteo` (todas
   * las novedades sin ver) y DEVUELVE los avisos que aún no se popearon (para el popup). Best-effort.
   */
  async revisar(clientIds: string[], miHid = ''): Promise<TicketAviso[]> {
    // DOS orígenes, según a quién le corresponde el aviso:
    //  · clientes de los equipos que el usuario DIRIGE (no los que solo revisa: a un especialista
    //    de un equipo no le tocan las novedades de ese equipo, solo a quien lo dirige);
    //  · tickets ASIGNADOS a él, dirija o no algún equipo.
    // La consulta por clientes solo se lanza si hay clientes → quien no dirige nada hace 1 petición.
    const [porEquipo, porAsignado] = await Promise.all([
      clientIds.length ? this.hd.fetchEquipo(clientIds, 30) : Promise.resolve([]),
      miHid ? this.hd.fetchAsignados(miHid, 30) : Promise.resolve([]),
    ]);
    // Un ticket puede venir por los dos caminos (es de mi equipo Y está asignado a mí) → una sola vez.
    const porNumero = new Map<string, (typeof porEquipo)[number]>();
    for (const t of [...porEquipo, ...porAsignado]) if (t?.ticket) porNumero.set(t.ticket, t);
    const tickets = [...porNumero.values()];
    if (!tickets.length) { this.conteo.set(0); return []; }
    const maxEntry = Math.max(...tickets.map((t) => this.ms(t.fechaIngreso)));
    const maxMod = Math.max(...tickets.map((t) => this.ms(t.fechaMod)));
    this.ultimoMaxEntry = Math.max(this.ultimoMaxEntry, maxEntry);
    this.ultimoMaxMod = Math.max(this.ultimoMaxMod, maxMod);
    const entryWm = this.getWm('entry');
    const modWm = this.getWm('mod');
    // 1ª corrida (sin marcas): BASELINE → no alerta por lo que ya existía.
    if (!entryWm && !modWm) { this.setWm('entry', maxEntry); this.setWm('mod', maxMod); this.conteo.set(0); return []; }

    // Clasifica cada ticket: creado tras la marca = 'nuevo'; si no, modificado tras la marca = 'actividad'.
    const candidatos: (TicketAviso & { sig: number })[] = [];
    for (const t of tickets) {
      const e = this.ms(t.fechaIngreso), m = this.ms(t.fechaMod);
      const base = { ticket: t.ticket, clienteRaw: t.clienteRaw || '', asunto: t.asunto || '' };
      // NADIE se avisa de lo suyo: si el ticket lo creé yo, no es novedad PARA MÍ.
      if (e > entryWm) { if (!this.esMio(t.usuarioIngreso, miHid)) candidatos.push({ ...base, motivo: 'nuevo', sig: e }); }
      else if (m > modWm) candidatos.push({ ...base, motivo: 'actividad', sig: m });
    }
    // Para las ACTIVIDADES hay que mirar QUIÉN las hizo, y el listado no lo dice: se piden los
    // mensajes SOLO de esos candidatos (normalmente 0–2, así que el coste es marginal).
    const avisos = miHid ? await this.descartarPropias(candidatos, modWm, miHid) : candidatos;
    this.conteo.set(avisos.length);
    // Popup: solo los que no se popearon aún (por ticket+motivo+señal → una nueva actividad re-alerta).
    const paraPopup: TicketAviso[] = [];
    for (const a of avisos) {
      const k = `${a.ticket}:${a.motivo}:${a.sig}`;
      if (this.alertados.has(k)) continue;
      this.alertados.add(k);
      paraPopup.push({ ticket: a.ticket, clienteRaw: a.clienteRaw, asunto: a.asunto, motivo: a.motivo });
    }
    return paraPopup;
  }

  /** ¿Ese id es el del usuario actual? Comparación laxa (may/min y espacios). */
  private esMio(id: string | undefined, miHid: string): boolean {
    return !!miHid && String(id || '').trim().toUpperCase() === miHid.trim().toUpperCase();
  }

  /**
   * Quita los avisos de ACTIVIDAD cuya única causa fui yo (comenté, cambié el estado o reasigné):
   * nadie debe recibir alertas de sus propias acciones. Si el cliente escribe, sí alerta.
   *
   * El listado de tickets no dice quién modificó, pero el historial del ticket sí: cada entrada trae
   * `entry_user_id`, **también las automáticas** que el HelpDesk crea al cambiar algo (verificado:
   * `system_message=true`, `entry_user_id=DACM001`, "El usuario … cambió el estado"). Se miran TODAS
   * las entradas posteriores a la marca —no solo la última—, así un comentario mío seguido de uno del
   * cliente sí avisa. Si no hay ninguna entrada que atribuir, **se alerta igual**: más vale un aviso
   * de más que perderse uno real.
   */
  private async descartarPropias(
    candidatos: (TicketAviso & { sig: number })[],
    modWm: number,
    miHid: string,
  ): Promise<(TicketAviso & { sig: number })[]> {
    const out: (TicketAviso & { sig: number })[] = [];
    for (const c of candidatos) {
      if (c.motivo !== 'actividad') { out.push(c); continue; }
      let entradasNuevas: any[] = [];
      try {
        const msgs = await this.hd.fetchMessages(c.ticket);
        entradasNuevas = (msgs || []).filter((m) => this.ms(m?.entry_date) > modWm);
      } catch {
        out.push(c); // no se pudo consultar → ante la duda, avisar
        continue;
      }
      // Sin rastro que atribuir, o alguna entrada de otra persona → sí es novedad para mí.
      if (!entradasNuevas.length || entradasNuevas.some((m) => !this.esMio(m?.entry_user_id, miHid))) out.push(c);
    }
    return out;
  }

  /** El RE vio la pestaña Equipo → avanza ambas marcas y limpia el badge (no re-alerta). */
  marcarVistos(): void {
    const now = Date.now();
    this.setWm('entry', Math.max(this.ultimoMaxEntry, now));
    this.setWm('mod', Math.max(this.ultimoMaxMod, now));
    this.alertados.clear();
    this.conteo.set(0);
  }
}
