package com.fitdesk.core;

import java.time.LocalDate;
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
 * Tarea: entidad DUEÑA. Vive en UN board (el del equipo dueño del cliente).
 * asignado_a puede ser de otro equipo (trabaja vía "Asignados a mí").
 */
@Entity
@Table(name = "tarea")
public class Tarea extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false, unique = true)
    public String codigo;

    @ManyToOne
    @JoinColumn(name = "ticket_espejo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public TicketEspejo ticketEspejo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "board_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Board board;

    @ManyToOne
    @JoinColumn(name = "sprint_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Sprint sprint;

    @ManyToOne(optional = false)
    @JoinColumn(name = "workflow_estado_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public WorkflowEstado workflowEstado;

    @ManyToOne
    @JoinColumn(name = "asignado_a")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Usuario asignadoA;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Cliente cliente;

    /** Código del cliente TAL COMO lo eligió el usuario (p. ej. helpdesk_client_id del catálogo).
     *  Se conserva para las REUNIONES con un cliente que aún NO está registrado como {@link Cliente}
     *  en FitDesk (sin equipo): así el cliente no se pierde y el picker (catálogo) hace round-trip. */
    @Column(name = "cliente_codigo_raw")
    public String clienteCodigoRaw;

    /** Nombre del cliente elegido (para mostrar aunque no exista un {@link Cliente} registrado). */
    @Column(name = "cliente_nombre")
    public String clienteNombre;

    public String titulo;
    public String descripcion;
    public String prioridad = "media";
    public int puntos = 1;
    public int progreso = 0;
    public boolean aprobado = false;

    @Column(name = "fecha_aprobacion")
    public LocalDate fechaAprobacion;

    @Column(name = "esperando_cliente")
    public boolean esperandoCliente = false;

    @Column(name = "fecha_esperando")
    public LocalDate fechaEsperando;

    @Column(name = "fecha_limite")
    public LocalDate fechaLimite;

    // ── Tipo de tarea + Reunión (V11) ──
    /** DESARROLLO_SOPORTE (default; las que tienen ticket) o REUNION. */
    @Column(nullable = false)
    public String tipo = "DESARROLLO_SOPORTE";
    /** Solo reunión: CAPACITACION | PRESENTACION | TRABAJO. */
    public String subtipo;
    /** Reunión: tema, link (opcional) y horario de inicio/fin (ISO local, texto). */
    @Column(columnDefinition = "text")
    public String tema;
    @Column(columnDefinition = "text")
    public String link;
    public String inicio;
    public String fin;
    /** Reunión: minutos ANTES del inicio para el recordatorio (alerta en la app). Null = default (20). */
    @Column(name = "recordatorio_min")
    public Integer recordatorioMin;

    // ── Transferencia de un ticket sin tarea previa (V13) ──
    /** true = tarea creada al PEDIR una transferencia desde un ticket, aún NO aceptada:
     *  invisible en los boards (se excluye de /stories) hasta que el equipo destino la acepta;
     *  si la rechaza, se descarta. Al aceptar pasa a false y aparece en el board destino. */
    @Column(name = "pendiente_transferencia", nullable = false)
    public boolean pendienteTransferencia = false;

    /** Cuándo entró a IN_PROGRESS por última vez (V28). Null = nunca desde que existe la columna. */
    @Column(name = "en_proceso_desde")
    public OffsetDateTime enProcesoDesde;

    @Column(name = "creado_en")
    public OffsetDateTime creadoEn = OffsetDateTime.now();

    @Column(name = "actualizado_en")
    public OffsetDateTime actualizadoEn = OffsetDateTime.now();

    public static Tarea findByCodigo(String codigo) {
        return find("codigo", codigo).firstResult();
    }
}
