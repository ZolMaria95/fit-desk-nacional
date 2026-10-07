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
    public LocalDate vigenteDesde = hoy();

    @Column(name = "vigente_hasta")
    public LocalDate vigenteHasta;

    public boolean activo = true;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    /** Senior de Turno que generó esta asignación (V35): el rol de responsable automático de la semana de
     *  "Mesa de ayuda". NULL = asignación hecha a mano en Administración. */
    @jakarta.persistence.ManyToOne
    @JoinColumn(name = "turno_senior_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public com.fitdesk.overlay.TurnoSenior turnoSenior;

    /** Zona del negocio: la vigencia de los roles se mide en hora de Ecuador (el servidor corre en UTC; con su
     *  fecha, un rol "de lunes a viernes" empezaba el domingo 19:00 y terminaba el viernes 19:00). */
    public static final java.time.ZoneId ZONA = java.time.ZoneId.of("America/Guayaquil");

    public static LocalDate hoy() {
        return LocalDate.now(ZONA);
    }

    /** ¿Las fechas cubren el día dado? (desde ≤ día ≤ hasta; sin fin = abierta). Antes solo se miraba el fin, así
     *  que una asignación con inicio futuro contaba desde ya. */
    public boolean enFechas(LocalDate dia) {
        return (vigenteDesde == null || !vigenteDesde.isAfter(dia)) && (vigenteHasta == null || !vigenteHasta.isBefore(dia));
    }

    /** Activa y en fechas el día dado. */
    public boolean vigente(LocalDate dia) {
        return activo && enFechas(dia);
    }
}
