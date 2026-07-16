package com.fitdesk.api;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.overlay.TicketPendiente;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Administración de Clientes (COAC). Cada cliente tiene un equipo responsable
 * (de ahí sale "los clientes de mi equipo") y opcionalmente su puente al HelpDesk.
 * Aquí es donde se dan de alta los clientes de otra regional (los 6 pendientes).
 */
@Path("/api/admin/clientes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClienteResource {

    @GET
    public List<Map<String, Object>> listar() {
        List<Map<String, Object>> out = new ArrayList<>();
        for (Cliente c : Cliente.<Cliente>list("order by nombre")) {
            out.add(salida(c));
        }
        return out;
    }

    @POST
    @Transactional
    public Response crear(JsonNode in) {
        String codigo = text(in, "codigo");
        String nombre = text(in, "nombre");
        Long equipoId = in.hasNonNull("equipoResponsableId") ? in.get("equipoResponsableId").asLong() : null;
        if (codigo == null || nombre == null || equipoId == null) {
            return bad("codigo, nombre y equipoResponsableId son obligatorios");
        }
        if (Cliente.findByCodigo(codigo) != null) {
            return bad("ya existe un cliente con codigo '" + codigo + "'");
        }
        Equipo eq = Equipo.findById(equipoId);
        if (eq == null) {
            return bad("equipo " + equipoId + " no existe");
        }
        Cliente c = new Cliente();
        c.codigo = codigo;
        c.nombre = nombre;
        c.equipoResponsable = eq;
        c.helpdeskClientId = text(in, "helpdeskClientId");
        c.color = text(in, "color");
        c.persist();
        return Response.status(Response.Status.CREATED).entity(salida(c)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response actualizar(@PathParam("id") Long id, JsonNode in) {
        Cliente c = Cliente.findById(id);
        if (c == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (text(in, "nombre") != null) {
            c.nombre = text(in, "nombre");
        }
        if (in.has("helpdeskClientId")) {
            c.helpdeskClientId = text(in, "helpdeskClientId");
        }
        if (in.has("color")) {
            c.color = text(in, "color");
        }
        if (in.has("activo")) {
            c.activo = in.get("activo").asBoolean(true);
        }
        if (in.hasNonNull("equipoResponsableId")) {
            Equipo eq = Equipo.findById(in.get("equipoResponsableId").asLong());
            if (eq != null) {
                c.equipoResponsable = eq;
            }
        }
        c.actualizadoEn = OffsetDateTime.now();
        return Response.ok(salida(c)).build();
    }

    /**
     * Quita un cliente (lo desliga de su región/equipo y lo borra). Desliga las
     * referencias que lo permiten (tarea/espejo/pendiente → cliente nulo) y borra
     * las asignaciones de alcance CLIENTE que lo apuntan (el CHECK exige la FK).
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response eliminar(@PathParam("id") Long id) {
        Cliente c = Cliente.findById(id);
        if (c == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        long asig = Asignacion.delete("alcanceCliente = ?1", c);
        Tarea.update("cliente = null where cliente = ?1", c);
        TicketEspejo.update("cliente = null where cliente = ?1", c);
        TicketPendiente.update("cliente = null where cliente = ?1", c);
        c.delete();
        return Response.ok(Map.of("eliminado", c.codigo, "asignacionesBorradas", asig)).build();
    }

    private static Map<String, Object> salida(Cliente c) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", c.id);
        m.put("codigo", c.codigo);
        m.put("nombre", c.nombre);
        m.put("helpdeskClientId", c.helpdeskClientId);
        m.put("color", c.color);
        m.put("activo", c.activo);
        m.put("equipoResponsableId", c.equipoResponsable != null ? c.equipoResponsable.id : null);
        m.put("equipoResponsableNombre", c.equipoResponsable != null ? c.equipoResponsable.nombre : null);
        return m;
    }

    private static String text(JsonNode n, String f) {
        JsonNode v = n == null ? null : n.get(f);
        if (v == null || v.isNull()) {
            return null;
        }
        String s = v.asText();
        return s == null || s.isBlank() ? null : s.trim();
    }

    private static Response bad(String msg) {
        return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", msg)).build();
    }
}
