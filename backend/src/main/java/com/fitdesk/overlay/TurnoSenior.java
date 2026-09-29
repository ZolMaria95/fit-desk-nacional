package com.fitdesk.overlay;

import java.time.LocalDate;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitdesk.core.Equipo;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/** turnoSenior → Senior de Turno: 2 roles por semana (Lun→Vie) y por equipo. Roles = helpdesk_user_id. */
@Entity
@Table(name = "turno_senior")
public class TurnoSenior extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo equipo;

    /** Lunes de la semana de turno (unicidad por semana + equipo, V27). */
    @Column(name = "semana_inicio", nullable = false)
    public LocalDate semanaInicio;

    @Column(name = "mesa_ayuda", length = 40)
    public String mesaAyuda;

    @Column(length = 40)
    public String emergentes;

    @Column(columnDefinition = "TEXT")
    public String notas;

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    public static TurnoSenior findBySemanaAndEquipo(LocalDate semanaInicio, Equipo equipo) {
        return find("semanaInicio = ?1 and equipo = ?2", semanaInicio, equipo).firstResult();
    }
}
