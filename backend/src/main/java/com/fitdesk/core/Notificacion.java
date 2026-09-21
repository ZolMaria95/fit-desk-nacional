package com.fitdesk.core;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Buzón de notificaciones (persistente, histórico — no se "retiran" cuando la condición deja de
 * aplicar, el usuario las marca leídas). Dos orígenes según el tipo:
 * - TAREA_ASIGNADA / TAREA_SIN_FINALIZAR: el backend las genera él mismo en el momento exacto de la
 *   escritura (crear/asignar tarea, moverla a Entregado) — 100% confiables, no dependen de que nadie
 *   tenga el navegador abierto.
 * - RECORDATORIO / REUNION / TICKET_NOVEDAD: las reporta el frontend cuando su propio chequeo
 *   periódico las detecta (mismo cálculo que ya dispara el popup) — solo entran al buzón si algún
 *   navegador con sesión abierta las vio.
 */
@Entity
@Table(name = "notificacion")
public class Notificacion extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario usuario;

    @Column(nullable = false)
    public String tipo; // RECORDATORIO | REUNION | TAREA_ASIGNADA | TAREA_SIN_FINALIZAR | TICKET_NOVEDAD

    /** Clave de dedup: única por (usuario, clave). Mismo formato que ya usa cada alerta hoy en
     *  `localStorage` (p. ej. "tarea-asig|TA-042|JPHP001", "reunion|TA-050"). */
    @Column(nullable = false)
    public String clave;

    @Column(nullable = false)
    public String titulo;

    public String cuerpo;

    /** Deep-link ("#/board?card=TA-042") para el clic desde el buzón. */
    public String url;

    public boolean leida = false;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "leido_en")
    public OffsetDateTime leidoEn;

    public static Notificacion findByUsuarioYClave(Usuario usuario, String clave) {
        return find("usuario = ?1 and clave = ?2", usuario, clave).firstResult();
    }
}
