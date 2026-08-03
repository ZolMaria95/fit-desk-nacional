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

/**
 * Feriado / día no laborable de la EMPRESA (nacional). Se muestra en el calendario de Vacaciones
 * para que todos planifiquen considerándolos. Puede abarcar un solo día o un rango (p. ej. puente).
 * Lo registra/borra un ADMIN; lo ve cualquiera.
 */
@Entity
@Table(name = "feriado")
public class Feriado extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false)
    public String nombre;

    @Column(name = "fecha_inicio", nullable = false)
    public LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    public LocalDate fechaFin;

    @ManyToOne
    @JoinColumn(name = "registrado_por")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario registradoPor;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();
}
