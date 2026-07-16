package com.fitdesk.overlay;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitdesk.core.TicketEspejo;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/** hdActions → flag "requiere/tiene acción" por número de ticket. */
@Entity
@Table(name = "ticket_accion")
public class TicketAccion extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "helpdesk_ticket_id", nullable = false, unique = true)
    public String helpdeskTicketId;

    @ManyToOne
    @JoinColumn(name = "ticket_espejo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public TicketEspejo ticketEspejo;

    public boolean marcado = true;

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    public static TicketAccion findByHelpdeskTicketId(String helpdeskTicketId) {
        return find("helpdeskTicketId", helpdeskTicketId).firstResult();
    }
}
