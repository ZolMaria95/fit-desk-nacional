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
 * Solicitud: escalado del Especialista (que no reasigna/transfiere directamente)
 * al Responsable de Equipo, que la APRUEBA (ejecuta) o RECHAZA.
 *  - tipo REASIGNACION: sugiere reasignar la Tarea a `asignadoSugerido`.
 *  - tipo TRANSFERENCIA: sugiere enviarla a `equipoDestino` (al aprobar genera una Transferencia).
 * Estados: PENDIENTE → APROBADA | RECHAZADA. La Tarea no cambia de board.
 */
@Entity
@Table(name = "solicitud")
public class Solicitud extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "tarea_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Tarea tarea;

    @ManyToOne(optional = false)
    @JoinColumn(name = "solicitante_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario solicitante;

    /** REASIGNACION | TRANSFERENCIA (CHECK en V5). */
    public String tipo;

    public String motivo;

    /** PENDIENTE | APROBADA | RECHAZADA (CHECK en V5). */
    public String estado = "PENDIENTE";

    /** Destino sugerido (tipo TRANSFERENCIA). */
    @ManyToOne
    @JoinColumn(name = "equipo_destino_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo equipoDestino;

    /** Persona sugerida (tipo REASIGNACION). */
    @ManyToOne
    @JoinColumn(name = "asignado_sugerido_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario asignadoSugerido;

    @ManyToOne
    @JoinColumn(name = "resuelta_por_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario resueltaPor;

    /** Transferencia generada al aprobar una solicitud tipo TRANSFERENCIA. */
    @ManyToOne
    @JoinColumn(name = "transferencia_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Transferencia transferencia;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "resuelto_en")
    public OffsetDateTime resueltoEn;
}
