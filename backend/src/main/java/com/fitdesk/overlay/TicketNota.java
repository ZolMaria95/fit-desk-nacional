package com.fitdesk.overlay;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitdesk.core.Equipo;
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

/** hdNotes → nota libre por ticket del HelpDesk, PROPIA de un equipo (unicidad ticket+equipo). */
@Entity
@Table(name = "ticket_nota")
public class TicketNota extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    // Unicidad por (ticket, equipo) — cada equipo tiene su propia nota (constraint en V7).
    @Column(name = "helpdesk_ticket_id", nullable = false)
    public String helpdeskTicketId;

    /** Equipo dueño de la nota (quien la creó). NULL solo en filas legacy migradas. */
    @ManyToOne
    @JoinColumn(name = "equipo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Equipo equipo;

    @ManyToOne
    @JoinColumn(name = "ticket_espejo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public TicketEspejo ticketEspejo;

    @Column(nullable = false)
    public String texto;

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    public static TicketNota findByHelpdeskTicketId(String helpdeskTicketId) {
        return find("helpdeskTicketId", helpdeskTicketId).firstResult();
    }

    /** Nota de un ticket para un equipo concreto (clave natural del modelo por-equipo). */
    public static TicketNota findByTicketAndEquipo(String helpdeskTicketId, Equipo equipo) {
        return find("helpdeskTicketId = ?1 and equipo = ?2", helpdeskTicketId, equipo).firstResult();
    }
}
