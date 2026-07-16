package com.fitdesk.etl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Board;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Regional;
import com.fitdesk.core.Sprint;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.core.Usuario;
import com.fitdesk.overlay.Consulta;
import com.fitdesk.overlay.Progreso;
import com.fitdesk.overlay.RotacionSemanal;
import com.fitdesk.overlay.TicketAccion;
import com.fitdesk.overlay.TicketNota;
import com.fitdesk.overlay.TicketPendiente;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Panel de operación del ETL (Fase 2). Se dispara a mano y es re-ejecutable:
 *   POST /api/admin/etl/import-firebase   → lee el snapshot y hace upsert.
 *   GET  /api/admin/etl/status            → conteos por tabla (verificación).
 */
@jakarta.ws.rs.Path("/api/admin/etl")
@Produces(MediaType.APPLICATION_JSON)
public class EtlResource {

    @Inject
    FirebaseEtlService etl;

    @Inject
    ObjectMapper mapper;

    @ConfigProperty(name = "fitdesk.etl.snapshot-path", defaultValue = "../docs/exports/firebase-snapshot-latest.json")
    String snapshotPath;

    @POST
    @jakarta.ws.rs.Path("/import-firebase")
    public Response importar(@QueryParam("path") String pathOverride) {
        String usarPath = (pathOverride != null && !pathOverride.isBlank()) ? pathOverride : snapshotPath;
        Path file = Path.of(usarPath);
        if (!Files.exists(file)) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(Map.of("error", "No existe el snapshot: " + file.toAbsolutePath(),
                            "hint", "Corre scripts/extract-firebase.sh o pasa ?path=..."))
                    .build();
        }
        try {
            JsonNode root = mapper.readTree(Files.readString(file));
            EtlReport reporte = etl.importar(root, file.toAbsolutePath().toString());
            return Response.ok(reporte).build();
        } catch (Exception ex) {
            return Response.serverError()
                    .entity(Map.of("error", ex.getClass().getSimpleName() + ": " + ex.getMessage()))
                    .build();
        }
    }

    @GET
    @jakarta.ws.rs.Path("/status")
    public Map<String, Long> status() {
        Map<String, Long> m = new LinkedHashMap<>();
        m.put("regional", Regional.count());
        m.put("equipo", Equipo.count());
        m.put("usuario", Usuario.count());
        m.put("asignacion", Asignacion.count());
        m.put("cliente", Cliente.count());
        m.put("board", Board.count());
        m.put("sprint", Sprint.count());
        m.put("tarea", Tarea.count());
        m.put("ticket_espejo", TicketEspejo.count());
        m.put("ticket_nota", TicketNota.count());
        m.put("ticket_accion", TicketAccion.count());
        m.put("ticket_pendiente", TicketPendiente.count());
        m.put("rotacion_semanal", RotacionSemanal.count());
        m.put("progreso", Progreso.count());
        m.put("consulta", Consulta.count());
        return m;
    }
}
