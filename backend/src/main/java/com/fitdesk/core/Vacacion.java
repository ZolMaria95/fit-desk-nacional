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
 * Período de VACACIONES o PERMISO (con cargo a vacaciones) de un empleado. Es el registro de
 * PLANIFICACIÓN que alimenta el calendario de la sección Vacaciones (vista por equipo y nacional).
 * La solicitud/aprobación FORMAL sigue siendo por el formato descargable (firmado por el empleado
 * y el jefe inmediato); aquí NO se lleva "saldo" de días (eso lo llena la unidad administrativa en
 * el formato). `diasVacacion = round(diasLaborables * 1.36)` según los lineamientos de la empresa.
 */
@Entity
@Table(name = "vacacion")
public class Vacacion extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    /** Empleado que toma las vacaciones/permiso. */
    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario usuario;

    @Column(name = "fecha_inicio", nullable = false)
    public LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    public LocalDate fechaFin;

    /** Días LABORABLES solicitados (base del cálculo). */
    @Column(name = "dias_laborables")
    public int diasLaborables;

    /** Días de VACACIONES = round(diasLaborables * 1.36) (descuento del saldo, que se lleva en el formato). */
    @Column(name = "dias_vacacion")
    public int diasVacacion;

    /** VACACIONES | PERMISO (permiso con cargo a vacaciones). */
    @Column(nullable = false)
    public String tipo = "VACACIONES";

    /** PLANIFICADA | APROBADA (informativo por ahora; la aprobación formal es por el formato). */
    @Column(nullable = false)
    public String estado = "PLANIFICADA";

    @Column(columnDefinition = "text")
    public String nota;

    /** Quién registró el período (Responsable de Equipo o ADMIN). */
    @ManyToOne
    @JoinColumn(name = "registrado_por")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario registradoPor;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    /** Factor de la empresa: días de vacaciones = días laborables × 1,36 (redondeado). */
    public static int calcularDiasVacacion(int diasLaborables) {
        return (int) Math.round(diasLaborables * 1.36);
    }
}
