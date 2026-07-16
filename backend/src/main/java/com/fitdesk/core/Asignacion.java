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
 * Asignacion: Rol × Alcance × Vigencia. Entidad clave de la autorización.
 * Alcance polimórfico: exactamente UNA de las FKs según alcance_tipo
 * (lo hace cumplir el CHECK chk_alcance_coherente en V1). Default deny.
 */
@Entity
@Table(name = "asignacion")
public class Asignacion extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario usuario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "rol_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Rol rol;

    @Column(name = "alcance_tipo", nullable = false)
    public String alcanceTipo;

    @ManyToOne
    @JoinColumn(name = "alcance_equipo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo alcanceEquipo;

    @ManyToOne
    @JoinColumn(name = "alcance_cliente_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Cliente alcanceCliente;

    @ManyToOne
    @JoinColumn(name = "alcance_regional_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Regional alcanceRegional;

    @Column(name = "vigente_desde", nullable = false)
    public LocalDate vigenteDesde = LocalDate.now();

    @Column(name = "vigente_hasta")
    public LocalDate vigenteHasta;

    public boolean activo = true;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();
}
