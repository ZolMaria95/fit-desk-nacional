package com.fitdesk.api;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Feriado;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Feriados / días no laborables de la empresa (nacionales) para el calendario de Vacaciones.
 * LECTURA abierta a cualquier actor logueado; ESCRITURA solo ADMIN (política de empresa).
 * Actor en X-Actor-Hid ({@link Actor}).
 */
@Path("/api/feriados")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FeriadoResource {

    @GET
    public List<Map<String, Object>> listar() {
        List<Map<String, Object>> out = new ArrayList<>();
        for (Feriado f : Feriado.<Feriado>list("order by fechaInicio")) {
            out.add(describir(f));
        }
        return out;
    }

    @POST
    @Transactional
    public Response crear(JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        if (!Actor.esAdmin(actorHid)) {
            return forbidden("solo un ADMIN puede registrar feriados");
        }
        String nombre = text(in, "nombre");
        LocalDate inicio = fecha(in, "fechaInicio");
        LocalDate fin = fecha(in, "fechaFin");
        if (nombre == null) {
            return bad("el nombre del feriado es obligatorio");
        }
        if (inicio == null) {
            return bad("fechaInicio es obligatoria (aaaa-mm-dd)");
        }
        if (fin == null) {
            fin = inicio; // un solo día
        }
        if (fin.isBefore(inicio)) {
            return bad("la fecha fin no puede ser anterior a la fecha inicio");
        }
        Feriado f = new Feriado();
        f.nombre = nombre;
        f.fechaInicio = inicio;
        f.fechaFin = fin;
        f.registradoPor = Actor.usuario(actorHid);
        f.persist();
        return Response.status(Response.Status.CREATED).entity(describir(f)).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response eliminar(@PathParam("id") Long id, @HeaderParam("X-Actor-Hid") String actorHid) {
        if (!Actor.esAdmin(actorHid)) {
            return forbidden("solo un ADMIN puede eliminar feriados");
        }
        Feriado f = Feriado.findById(id);
        if (f == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        f.delete();
        return Response.noContent().build();
    }

    static Map<String, Object> describir(Feriado f) {
        Map<String, Object> o = new LinkedHashMap<>();
        o.put("id", f.id);
        o.put("nombre", f.nombre);
        o.put("fechaInicio", f.fechaInicio != null ? f.fechaInicio.toString() : null);
        o.put("fechaFin", f.fechaFin != null ? f.fechaFin.toString() : null);
        o.put("registradoPor", f.registradoPor != null ? f.registradoPor.nombre : null);
        o.put("creadoEn", f.creadoEn != null ? f.creadoEn.toString() : null);
        return o;
    }

    private static String text(JsonNode n, String f) {
        JsonNode v = n == null ? null : n.get(f);
        if (v == null || v.isNull()) {
            return null;
        }
        String s = v.asText();
        return s == null || s.isBlank() ? null : s.trim();
    }

    private static LocalDate fecha(JsonNode n, String f) {
        String s = text(n, f);
        if (s == null) {
            return null;
        }
        try {
            return LocalDate.parse(s.length() > 10 ? s.substring(0, 10) : s);
        } catch (Exception e) {
            return null;
        }
    }

    private static Response bad(String msg) {
        return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", msg)).build();
    }

    private static Response forbidden(String msg) {
        return Response.status(Response.Status.FORBIDDEN).entity(Map.of("error", msg)).build();
    }
}
