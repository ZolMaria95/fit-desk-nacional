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
 * Mensaje ENTRE EQUIPOS sobre una Tarea/ticket: un Responsable de Equipo le escribe al RE
 * del equipo que desarrolla la tarea (p. ej. recordar que sigue pendiente, pedir avance).
 * Lo envía un RE (o ADMIN) desde la tarjeta del board; lo ve, en su Bandeja, quien gobierna
 * el equipo de esa tarea (el destinatario se deriva por gobierno del equipo, no se guarda).
 */
@Entity
@Table(name = "mensaje")
public class Mensaje extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "tarea_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Tarea tarea;

    /** Quién envía el mensaje (un Responsable de Equipo). */
    @ManyToOne(optional = false)
    @JoinColumn(name = "de_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario de;

    @Column(columnDefinition = "text")
    public String texto;

    @Column(nullable = false)
    public boolean visto = false;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "visto_en")
    public OffsetDateTime vistoEn;
}
