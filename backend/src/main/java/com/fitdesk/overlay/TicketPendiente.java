package com.fitdesk.overlay;

import java.time.LocalDate;
import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.TicketEspejo;
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

/** hdPendientes → recordatorio con fecha/hora y alarma diaria. */
@Entity
@Table(name = "ticket_pendiente")
public class TicketPendiente extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    // Unicidad por (ticket, usuario) — cada persona tiene su propio recordatorio (constraint en V6).
    @Column(name = "helpdesk_ticket_id", nullable = false)
    public String helpdeskTicketId;

    /** Dueño del recordatorio (quién lo creó). NULL solo en filas legacy migradas. */
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "ticket_espejo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public TicketEspejo ticketEspejo;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Cliente cliente;

    public String asunto;

    @Column(name = "cliente_raw")
    public String clienteRaw;

    @Column(name = "due_date")
    public LocalDate dueDate;

    @Column(name = "due_time")
    public String dueTime;

    @Column(name = "added_at")
    public OffsetDateTime addedAt;

    @Column(name = "last_alerted")
    public LocalDate lastAlerted;

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    public static TicketPendiente findByHelpdeskTicketId(String helpdeskTicketId) {
        return find("helpdeskTicketId", helpdeskTicketId).firstResult();
    }

    /** Recordatorio de un ticket para un dueño concreto (clave natural en el modelo por-usuario). */
    public static TicketPendiente findByTicketAndUsuario(String helpdeskTicketId, Usuario usuario) {
        return find("helpdeskTicketId = ?1 and usuario = ?2", helpdeskTicketId, usuario).firstResult();
    }
}
