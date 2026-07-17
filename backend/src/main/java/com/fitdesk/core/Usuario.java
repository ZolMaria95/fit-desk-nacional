package com.fitdesk.core;

import java.time.OffsetDateTime;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Usuario: identidad federada al HelpDesk. Login vive en el HelpDesk;
 * aquí solo el puente (helpdesk_user_id) y datos del legacy (codigo_local).
 * El ETL reconcilia ambos espacios de id (ver 07-identidades-equivalencia.md).
 */
@Entity
@Table(name = "usuario")
public class Usuario extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "helpdesk_user_id", unique = true)
    public String helpdeskUserId;

    @Column(name = "codigo_local")
    public String codigoLocal;

    @Column(nullable = false)
    public String nombre;

    public String email;
    public String alias;
    public String color;

    /** Foto de perfil (data URI base64, comprimida ~128px por el frontend). NULL = sin foto. */
    @Column(columnDefinition = "text")
    public String foto;

    public boolean activo = true;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    public static Usuario findByCodigoLocal(String codigoLocal) {
        return find("codigoLocal", codigoLocal).firstResult();
    }

    public static Usuario findByHelpdeskUserId(String helpdeskUserId) {
        return find("helpdeskUserId", helpdeskUserId).firstResult();
    }
}
