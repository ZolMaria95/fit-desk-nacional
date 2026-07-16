package com.fitdesk.core;

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

/** Cliente = COAC. equipo_responsable deriva "los clientes de mi equipo". */
@Entity
@Table(name = "cliente")
public class Cliente extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "helpdesk_client_id", unique = true)
    public String helpdeskClientId;

    @Column(nullable = false, unique = true)
    public String codigo;

    @Column(nullable = false)
    public String nombre;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipo_responsable_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo equipoResponsable;

    public String color;
    public boolean activo = true;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    public static Cliente findByCodigo(String codigo) {
        return find("codigo", codigo).firstResult();
    }
}
