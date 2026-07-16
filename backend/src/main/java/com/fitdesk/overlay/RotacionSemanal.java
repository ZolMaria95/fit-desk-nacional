package com.fitdesk.overlay;

import java.time.LocalDate;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Usuario;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/** weeklySupport → rotación semanal de soporte (semana Vie→Jue). */
@Entity
@Table(name = "rotacion_semanal")
public class RotacionSemanal extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    // Unicidad por (semana, equipo) — cada equipo su rotación (constraint en V8).
    @Column(name = "semana_inicio", nullable = false)
    public LocalDate semanaInicio;

    /** Equipo dueño de la rotación. NULL solo en filas legacy sin equipo resuelto. */
    @ManyToOne
    @JoinColumn(name = "equipo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo equipo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario usuario;

    @Column(name = "assignee_local")
    public String assigneeLocal;

    public String notas;

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    public static RotacionSemanal findBySemanaInicio(LocalDate semanaInicio) {
        return find("semanaInicio", semanaInicio).firstResult();
    }

    public static RotacionSemanal findBySemanaAndEquipo(LocalDate semanaInicio, Equipo equipo) {
        return find("semanaInicio = ?1 and equipo = ?2", semanaInicio, equipo).firstResult();
    }
}
