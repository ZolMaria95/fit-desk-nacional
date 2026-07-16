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

/** Board: tablero Scrum de un Equipo. Una Tarea = un Board. */
@Entity
@Table(name = "board")
public class Board extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo equipo;

    @Column(nullable = false)
    public String codigo;

    @Column(nullable = false)
    public String nombre;

    public boolean activo = true;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();
}
