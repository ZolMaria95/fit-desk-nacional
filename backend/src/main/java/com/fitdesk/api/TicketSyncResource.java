package com.fitdesk.api;

import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.sync.TicketSyncService;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

/**
 * Disparo del sync del espejo de tickets (Fase 3).
 *   POST /api/admin/sync/tickets          → pagina el HelpDesk con el Bearer y cachea.
 *   POST /api/admin/sync/tickets/import   → cachea un lote ya obtenido (sin auth; test/manual).
 */
@Path("/api/admin/sync/tickets")
@Produces(MediaType.APPLICATION_JSON)
public class TicketSyncResource {

    @Inject
    TicketSyncService sync;

    /** Sync en vivo: usa el Bearer del HelpDesk (header Authorization) para paginar y cachear. */
    @POST
    public Map<String, Object> syncLive(
            @HeaderParam("Authorization") String authorization,
            @QueryParam("pages") @DefaultValue("20") int pages) {
        return sync.sync(authorization, Math.max(1, Math.min(pages, 100)));
    }

    /** Importa un lote de tickets ({items:[...]} o un array) al espejo. Verifica el mapeo sin auth. */
    @POST
    @Path("/import")
    @Consumes(MediaType.APPLICATION_JSON)
    public Map<String, Object> importItems(JsonNode body) {
        JsonNode items = body != null && body.has("items") ? body.get("items") : body;
        return sync.importItems(items);
    }
}
