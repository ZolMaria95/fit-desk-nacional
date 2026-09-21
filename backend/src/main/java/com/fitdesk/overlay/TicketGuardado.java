package com.fitdesk.overlay;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
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

/** hdGuardados → guardado personal de un ticket, para consultarlo después. 100% del dueño, sin
 *  visibilidad de equipo/admin (a diferencia de {@link TicketPendiente}). */
@Entity
@Table(name = "ticket_guardado")
public class TicketGuardado extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "helpdesk_ticket_id", nullable = false)
    public String helpdeskTicketId;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario usuario;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    public static TicketGuardado findByTicketAndUsuario(String helpdeskTicketId, Usuario usuario) {
        return find("helpdeskTicketId = ?1 and usuario = ?2", helpdeskTicketId, usuario).firstResult();
    }
}
