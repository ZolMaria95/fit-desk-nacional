package com.fitdesk.sync;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.Map;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

/**
 * Sync incremental del espejo de tickets (Fase 3). Trae los encabezados del
 * HelpDesk paginando en bloque (limit=100) y los cachea en Postgres vía
 * {@link TicketEspejoStore}. Reemplaza el "martilleo" del board (un GET por
 * tarjeta) por una consulta paginada; la app luego lee el estado del espejo.
 *
 * Autenticación: usa un Bearer del HelpDesk. Hoy se pasa en el disparo (el token
 * del usuario logueado); cuando exista el JWT/cuenta de servicio propia (slice
 * siguiente) el sync correrá en background sin depender de una sesión.
 */
@ApplicationScoped
public class TicketSyncService {

    private static final Logger LOG = Logger.getLogger(TicketSyncService.class);
    private static final int PAGE = 100;

    @Inject
    TicketEspejoStore store;

    @Inject
    ObjectMapper mapper;

    @ConfigProperty(name = "fitdesk.helpdesk.base-url", defaultValue = "https://helpdesk-api.fit-bank.com/api/v1")
    String base;

    private final HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();

    /** Importa un lote de tickets ya obtenido (verificable sin auth). Delegado al store. */
    public Map<String, Object> importItems(JsonNode items) {
        int[] c = store.upsert(items);
        return report(items != null && items.isArray() ? items.size() : 0, c[0], c[1], 1, null, null);
    }

    /** Sync en vivo: pagina el HelpDesk con el Bearer dado y cachea cada página. */
    public Map<String, Object> sync(String bearer, int maxPages) {
        int pages = 0;
        int fetched = 0;
        int ins = 0;
        int upd = 0;
        Integer total = null;
        for (; pages < maxPages; pages++) {
            JsonNode data = fetchPage(bearer, PAGE, pages * PAGE);
            if (data == null) {
                return report(fetched, ins, upd, pages,
                        total, "fallo al leer el HelpDesk (¿token inválido o red?) en offset " + (pages * PAGE));
            }
            if (total == null && data.has("total")) {
                total = data.get("total").asInt();
            }
            JsonNode items = data.path("items");
            int n = items.isArray() ? items.size() : 0;
            if (n == 0) {
                break;
            }
            int[] c = store.upsert(items);
            ins += c[0];
            upd += c[1];
            fetched += n;
            if (n < PAGE) {
                break; // última página
            }
        }
        LOG.infof("Sync tickets: %d traídos (%d nuevos, %d act.) en %d páginas", fetched, ins, upd, pages);
        return report(fetched, ins, upd, pages, total, null);
    }

    private JsonNode fetchPage(String bearer, int limit, int offset) {
        String url = base + "/tickets/tickets?limit=" + limit + "&offset=" + offset + "&modified_date_order=desc";
        try {
            HttpRequest.Builder rb = HttpRequest.newBuilder(URI.create(url))
                    .timeout(Duration.ofSeconds(60))
                    .GET();
            if (bearer != null && !bearer.isBlank()) {
                rb.header("Authorization", bearer.startsWith("Bearer ") ? bearer : "Bearer " + bearer);
            }
            HttpResponse<String> r = client.send(rb.build(), HttpResponse.BodyHandlers.ofString());
            if (r.statusCode() != 200) {
                LOG.warnf("Sync: HelpDesk devolvió HTTP %d en offset %d", r.statusCode(), offset);
                return null;
            }
            return mapper.readTree(r.body());
        } catch (Exception ex) {
            LOG.warnf("Sync: error consultando el HelpDesk: %s", ex.toString());
            return null;
        }
    }

    private static Map<String, Object> report(int fetched, int ins, int upd, int pages, Integer total, String error) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("traidos", fetched);
        m.put("insertados", ins);
        m.put("actualizados", upd);
        m.put("paginas", pages);
        m.put("totalHelpdesk", total);
        if (error != null) {
            m.put("error", error);
        }
        return m;
    }
}
