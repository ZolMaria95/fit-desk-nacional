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
 * Transferencia: handoff de una Tarea de un equipo a otro. Cambia el asignado,
 * NO el board (la Tarea sigue en el board del equipo dueño del cliente). Es
 * request-based: nace PENDIENTE y el equipo destino la ACEPTA (asignando a un
 * miembro → COMPLETADA) o la RECHAZA. Ver 12-roles-y-responsabilidades.md.
 */
@Entity
@Table(name = "transferencia")
public class Transferencia extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "tarea_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Tarea tarea;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipo_origen_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo equipoOrigen;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipo_destino_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo equipoDestino;

    /** Quién envió la transferencia (RE/ADMIN del equipo origen). */
    @ManyToOne
    @JoinColumn(name = "despachador_origen_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario despachadorOrigen;

    /** Quién la resolvió (RE/ADMIN del equipo destino). */
    @ManyToOne
    @JoinColumn(name = "despachador_destino_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario despachadorDestino;

    /** A quién quedó asignada la Tarea al aceptar (auditoría). */
    @ManyToOne
    @JoinColumn(name = "asignado_destino_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario asignadoDestino;

    /** PENDIENTE | ACEPTADA | RECHAZADA | COMPLETADA (CHECK en V1). */
    public String estado = "PENDIENTE";

    public String motivo;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "resuelto_en")
    public OffsetDateTime resueltoEn;
}
