package com.fitdesk.notificaciones;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Notificacion;
import com.fitdesk.core.Solicitud;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.Transferencia;
import com.fitdesk.core.Usuario;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

/**
 * Buzón de notificaciones. Los métodos que no reciben tipo por parámetro los llaman directamente
 * {@code LegacyWriteService} (crear/asignar tarea, moverla a Entregado), {@code TransferenciaResource}
 * y {@code SolicitudResource} en el momento exacto de la escritura — el backend las genera él mismo,
 * sin depender de que nadie tenga el navegador abierto. El resto de tipos (recordatorio, reunión,
 * ticket) las reporta el frontend vía {@link com.fitdesk.api.NotificacionResource#crear}.
 */
@ApplicationScoped
public class NotificacionService {

    /** Upsert idempotente por (usuario, clave): un reintento del mismo evento no duplica. */
    @Transactional
    public void crear(Usuario destinatario, String tipo, String clave, String titulo, String cuerpo, String url) {
        if (destinatario == null || clave == null || clave.isBlank()) {
            return;
        }
        if (Notificacion.findByUsuarioYClave(destinatario, clave) != null) {
            return; // ya existe: no duplica
        }
        Notificacion n = new Notificacion();
        n.usuario = destinatario;
        n.tipo = tipo;
        n.clave = clave;
        n.titulo = titulo;
        n.cuerpo = cuerpo;
        n.url = url;
        n.persist();
    }

    /** Tarea SIN ticket recién asignada → notifica al asignado. Clave: tarea+asignado (si se
     *  reasigna a otra persona, es una clave nueva y sí vuelve a notificar al nuevo). */
    public void tareaAsignada(Tarea t) {
        if (t.ticketEspejo != null || t.asignadoA == null || t.asignadoA.helpdeskUserId == null) {
            return;
        }
        String hid = t.asignadoA.helpdeskUserId.trim().toUpperCase();
        String clave = "tarea-asig|" + t.codigo + "|" + hid;
        String cliente = t.clienteNombre != null ? t.clienteNombre : (t.cliente != null ? t.cliente.nombre : null);
        crear(t.asignadoA, "TAREA_ASIGNADA", clave,
                "Nueva tarea asignada: " + t.codigo,
                (cliente != null ? cliente + " — " : "") + (t.titulo != null ? t.titulo : ""),
                "#/board?card=" + t.codigo);
    }

    /** Tarea SIN ticket que llegó a "Entregado" sin marcarse Finalizada → notifica a quien DIRIGE
     *  el equipo de esa tarea: Asignación EQUIPO sobre ese equipo exacto Y REGIONAL sobre su
     *  regional (los dos, no uno como respaldo del otro — mismo criterio ya pedido para el picker
     *  "Asignar a"). Una fila por destinatario: cada quien tiene su propia notificación. */
    public void tareaSinFinalizar(Tarea t) {
        if (t.ticketEspejo != null || t.board == null || t.board.equipo == null) {
            return;
        }
        String cliente = t.clienteNombre != null ? t.clienteNombre : (t.cliente != null ? t.cliente.nombre : null);
        String clave = "tarea-done|" + t.codigo;
        for (Usuario re : responsablesDe(t.board.equipo)) {
            crear(re, "TAREA_SIN_FINALIZAR", clave,
                    "Falta finalizar: " + t.codigo,
                    (cliente != null ? cliente + " — " : "") + (t.titulo != null ? t.titulo : ""),
                    "#/board?card=" + t.codigo);
        }
    }

    /** Tarea recién FINALIZADA → marca leída su "Falta finalizar" (si existía), para todos los RE
     *  que la recibieron. El buzón es histórico y normalmente no se retira solo, pero esta alerta en
     *  concreto queda FALSA en cuanto la tarea se finaliza — dejarla sin leer confunde al RE. */
    @Transactional
    public void resolverTareaFinalizada(Tarea t) {
        String clave = "tarea-done|" + t.codigo;
        Notificacion.update("leida = true, leidoEn = ?1 where clave = ?2 and leida = false",
                OffsetDateTime.now(), clave);
    }

    /** Transferencia recién enviada a otro equipo → notifica a quien DIRIGE el equipo DESTINO
     *  (mismo criterio que "Asignar a" al aceptar: EQUIPO exacto + REGIONAL de su regional). */
    public void transferenciaPendiente(Transferencia t) {
        if (t.equipoDestino == null) {
            return;
        }
        String codigo = t.tarea != null ? t.tarea.codigo : null;
        String clave = "transferencia|" + t.id;
        for (Usuario re : responsablesDe(t.equipoDestino)) {
            crear(re, "TRANSFERENCIA_PENDIENTE", clave,
                    "Transferencia pendiente" + (codigo != null ? ": " + codigo : ""),
                    "Desde " + (t.equipoOrigen != null ? t.equipoOrigen.nombre : "otro equipo"),
                    "#/bandeja/transferencias");
        }
    }

    /** Solicitud (reasignación/transferencia) escalada por un especialista → notifica a quien
     *  DIRIGE el equipo DUEÑO de la tarea (quien la aprueba o rechaza). */
    public void solicitudPendiente(Solicitud s) {
        if (s.tarea == null || s.tarea.board == null || s.tarea.board.equipo == null) {
            return;
        }
        String codigo = s.tarea.codigo;
        String clave = "solicitud|" + s.id;
        for (Usuario re : responsablesDe(s.tarea.board.equipo)) {
            crear(re, "SOLICITUD_PENDIENTE", clave,
                    "Solicitud pendiente" + (codigo != null ? ": " + codigo : ""),
                    s.solicitante != null ? "De " + s.solicitante.nombre : null,
                    "#/bandeja/solicitudes");
        }
    }

    /** Responsables VIGENTES de un equipo: Asignación EQUIPO exacta sobre él Y REGIONAL sobre su
     *  regional (los dos, no uno como respaldo del otro) — mismo criterio ya usado para el picker
     *  "Asignar a" y para {@code tareaSinFinalizar}. Sin duplicados si alguien califica por ambas. */
    private static List<Usuario> responsablesDe(Equipo eq) {
        LocalDate hoy = com.fitdesk.core.Asignacion.hoy();
        List<Asignacion> candidatos = new ArrayList<>();
        candidatos.addAll(Asignacion.<Asignacion>list(
                "rol.codigo = 'RESPONSABLE_EQUIPO' and alcanceTipo = 'EQUIPO' and alcanceEquipo = ?1 and activo = true", eq));
        if (eq.regional != null) {
            candidatos.addAll(Asignacion.<Asignacion>list(
                    "rol.codigo = 'RESPONSABLE_EQUIPO' and alcanceTipo = 'REGIONAL' and alcanceRegional = ?1 and activo = true",
                    eq.regional));
        }
        Set<Long> vistos = new HashSet<>();
        List<Usuario> out = new ArrayList<>();
        for (Asignacion a : candidatos) {
            if (!a.enFechas(hoy)) {
                continue;
            }
            Usuario re = a.usuario;
            if (re != null && vistos.add(re.id)) {
                out.add(re);
            }
        }
        return out;
    }
}
