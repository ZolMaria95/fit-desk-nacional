package com.fitdesk.core;

import java.time.LocalDate;
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

/** Sprint: pertenece a un Board; cada equipo con su cadencia. */
@Entity
@Table(name = "sprint")
public class Sprint extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "board_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Board board;

    @Column(nullable = false)
    public String codigo;

    @Column(nullable = false)
    public String nombre;

    public String estado = "active";
    public int capacidad = 0;
    public String objetivo;

    @Column(name = "fecha_inicio")
    public LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    public LocalDate fechaFin;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();
}
