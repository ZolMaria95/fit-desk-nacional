package com.fitdesk.overlay;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitdesk.core.Tarea;
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

/** queries → consultas/dudas del legacy. */
@Entity
@Table(name = "consulta")
public class Consulta extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false, unique = true)
    public String codigo;

    @Column(name = "tarea_codigo")
    public String tareaCodigo;

    @ManyToOne
    @JoinColumn(name = "tarea_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Tarea tarea;

    @Column(name = "autor_local")
    public String autorLocal;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario autor;

    public LocalDate fecha;
    public String titulo;
    public String descripcion;
    public String prioridad;
    public String estado;

    public static Consulta findByCodigo(String codigo) {
        return find("codigo", codigo).firstResult();
    }
}
