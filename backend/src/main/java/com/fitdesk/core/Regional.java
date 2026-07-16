package com.fitdesk.core;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Regional: agrupador geográfico (Cuenca, Quito, Guayaquil…). */
@Entity
@Table(name = "regional")
public class Regional extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false, unique = true)
    public String codigo;

    @Column(nullable = false)
    public String nombre;

    public boolean activo = true;
}
