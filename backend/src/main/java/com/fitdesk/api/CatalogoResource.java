package com.fitdesk.api;

import java.util.List;
import java.util.Map;

import com.fitdesk.core.Rol;
import com.fitdesk.core.WorkflowEstado;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

/** Catálogos de referencia (roles, columnas de workflow) + healthcheck de datos. */
@Path("/api/catalogos")
@Produces(MediaType.APPLICATION_JSON)
public class CatalogoResource {

    @GET
    @Path("/roles")
    public List<Rol> roles() {
        return Rol.listAll();
    }

    @GET
    @Path("/workflow-estados")
    public List<WorkflowEstado> workflowEstados() {
        return WorkflowEstado.list("order by orden");
    }

    /** Verifica conectividad a Postgres y que Flyway sembró los catálogos. */
    @GET
    @Path("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "ok",
                "roles", Rol.count(),
                "workflowEstados", WorkflowEstado.count());
    }
}
