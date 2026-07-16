package com.fitdesk.api;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

/**
 * Proxy transparente al API del HelpDesk (Fase 3). Quarkus se vuelve la ÚNICA
 * fuente del frontend: reenvía `/api/v1/**` a `helpdesk-api.fit-bank.com/api/v1/**`
 * preservando método, query, headers (incl. Authorization) y cuerpo crudo, y
 * relayando la respuesta tal cual (JSON, form, multipart, blobs de adjuntos).
 * Reemplaza el proxy del dev server de Angular y el Cloudflare Worker; el CORS lo
 * pone el filtro CORS de Quarkus (server-side). NO cachea (eso es el TicketEspejo,
 * slice siguiente); es un relay 1:1.
 */
@Path("/api/v1")
@Consumes(MediaType.WILDCARD)
public class HelpdeskProxyResource {

    private static final Logger LOG = Logger.getLogger(HelpdeskProxyResource.class);

    @ConfigProperty(name = "fitdesk.helpdesk.base-url", defaultValue = "https://helpdesk-api.fit-bank.com/api/v1")
    String target;

    /** Headers de request que NO se reenvían (hop-by-hop, o los rechaza el HttpClient del JDK). */
    private static final Set<String> SKIP_REQ = Set.of(
            "host", "content-length", "connection", "upgrade", "expect", "transfer-encoding",
            "keep-alive", "te", "trailer", "proxy-connection", "origin", "referer", "accept-encoding");

    /** Headers de response que NO se copian (los maneja Quarkus/JAX-RS o el filtro CORS). */
    private static final Set<String> SKIP_RESP = Set.of(
            "transfer-encoding", "content-length", "connection",
            "access-control-allow-origin", "access-control-allow-credentials",
            "access-control-allow-methods", "access-control-allow-headers");

    private final HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    @GET
    @Path("/{path:.*}")
    public Response get(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers) {
        return forward("GET", path, uriInfo, headers, new byte[0]);
    }

    @DELETE
    @Path("/{path:.*}")
    public Response delete(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers) {
        return forward("DELETE", path, uriInfo, headers, new byte[0]);
    }

    @POST
    @Path("/{path:.*}")
    public Response post(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers,
            InputStream body) throws IOException {
        return forward("POST", path, uriInfo, headers, readAll(body));
    }

    @PUT
    @Path("/{path:.*}")
    public Response put(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers,
            InputStream body) throws IOException {
        return forward("PUT", path, uriInfo, headers, readAll(body));
    }

    @PATCH
    @Path("/{path:.*}")
    public Response patch(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers,
            InputStream body) throws IOException {
        return forward("PATCH", path, uriInfo, headers, readAll(body));
    }

    private Response forward(String method, String path, UriInfo uriInfo, HttpHeaders headers, byte[] body) {
        String query = uriInfo.getRequestUri().getRawQuery();
        String url = target + (path == null || path.isBlank() ? "" : "/" + path) + (query != null ? "?" + query : "");

        HttpRequest.BodyPublisher publisher = (body == null || body.length == 0)
                ? HttpRequest.BodyPublishers.noBody()
                : HttpRequest.BodyPublishers.ofByteArray(body);

        HttpRequest.Builder rb = HttpRequest.newBuilder(URI.create(url))
                .timeout(Duration.ofSeconds(60))
                .method(method, publisher);

        for (Map.Entry<String, List<String>> e : headers.getRequestHeaders().entrySet()) {
            if (SKIP_REQ.contains(e.getKey().toLowerCase())) {
                continue;
            }
            for (String v : e.getValue()) {
                rb.header(e.getKey(), v);
            }
        }

        try {
            HttpResponse<byte[]> resp = client.send(rb.build(), HttpResponse.BodyHandlers.ofByteArray());
            Response.ResponseBuilder out = Response.status(resp.statusCode());
            resp.headers().map().forEach((name, vals) -> {
                if (SKIP_RESP.contains(name.toLowerCase())) {
                    return;
                }
                for (String v : vals) {
                    out.header(name, v);
                }
            });
            byte[] payload = resp.body() != null ? resp.body() : new byte[0];
            return out.entity(payload).build();
        } catch (Exception ex) {
            LOG.warnf("Proxy HelpDesk %s %s falló: %s", method, path, ex.toString());
            return Response.status(Response.Status.BAD_GATEWAY)
                    .type(MediaType.APPLICATION_JSON)
                    .entity("{\"error\":\"proxy al HelpDesk falló: " + ex.getMessage() + "\"}")
                    .build();
        }
    }

    private static byte[] readAll(InputStream in) throws IOException {
        return in == null ? new byte[0] : in.readAllBytes();
    }
}
