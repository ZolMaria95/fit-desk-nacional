package com.fitdesk.core;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Rol: catálogo (qué puede hacer). Sembrado en V2. Ver 01-modelo-conceptual.md. */
@Entity
@Table(name = "rol")
public class Rol extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String codigo;
    public String nombre;
    public String descripcion;
}
