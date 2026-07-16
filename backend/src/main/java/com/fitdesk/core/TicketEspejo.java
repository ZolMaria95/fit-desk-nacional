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

/**
 * Espejo liviano del ticket del HelpDesk. SOLO encabezado: NO guarda la
 * conversación ni los adjuntos (se consumen en vivo). Sync incremental.
 */
@Entity
@Table(name = "ticket_espejo")
public class TicketEspejo extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "helpdesk_ticket_id", nullable = false, unique = true)
    public String helpdeskTicketId;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Cliente cliente;

    public String asunto;

    @Column(name = "estado_origen")
    public String estadoOrigen;

    public String prioridad;

    @Column(name = "asignado_hd")
    public String asignadoHd;

    @Column(name = "fecha_ingreso")
    public OffsetDateTime fechaIngreso;

    @Column(name = "fecha_modificacion")
    public OffsetDateTime fechaModificacion;

    @Column(name = "last_synced_at")
    public OffsetDateTime lastSyncedAt = OffsetDateTime.now();

    public static TicketEspejo findByHelpdeskTicketId(String helpdeskTicketId) {
        return find("helpdeskTicketId", helpdeskTicketId).firstResult();
    }
}
