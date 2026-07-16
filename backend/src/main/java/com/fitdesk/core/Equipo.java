package com.fitdesk.core;

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

/** Equipo: unidad de trabajo; pertenece a una Regional; dueño de Boards. */
@Entity
@Table(name = "equipo")
public class Equipo extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "regional_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Regional regional;

    @Column(nullable = false)
    public String codigo;

    @Column(nullable = false)
    public String nombre;

    public boolean activo = true;
}
