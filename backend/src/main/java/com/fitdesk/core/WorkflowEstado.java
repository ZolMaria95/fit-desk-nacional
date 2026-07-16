package com.fitdesk.core;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Columna del board (workflow corporativo estándar, extensible). Sembrado en V2. */
@Entity
@Table(name = "workflow_estado")
public class WorkflowEstado extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String codigo;
    public String nombre;
    public int orden;
    public String categoria;
    public boolean activo = true;
}
