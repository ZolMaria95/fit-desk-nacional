package com.fitdesk.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.legacy.LegacyWriteService;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Escrituras legacy-compatibles (Fase 3, slice 2). Reflejan los write paths que
 * el DataService de Angular usa contra Firebase, pero contra Postgres. En modo
 * Quarkus el front rutea aquí sus PUT/PATCH/DELETE; Firebase NO se toca.
 */
@Path("/api/legacy")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class LegacyWriteResource {

    @Inject
    LegacyWriteService write;

    // ── Stories ──────────────────────────────────────────────────────────
    @PATCH
    @Path("/stories/stories/{id}")
    public Response patchStory(@PathParam("id") String id, JsonNode fields) {
        return write.patchStory(id, fields)
                ? Response.ok().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }

    @PATCH
    @Path("/stories/stories")
    public Response patchStories(JsonNode body) {
        write.patchStories(body);
        return Response.ok().build();
    }

    @DELETE
    @Path("/stories/stories/{id}")
    public Response deleteStory(@PathParam("id") String id) {
        return write.deleteStory(id)
                ? Response.noContent().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }

    // ── Sprints ──────────────────────────────────────────────────────────
    @PUT
    @Path("/sprints")
    public Response putSprints(JsonNode node, @QueryParam("board") String board) {
        write.putSprints(node, board);
        return Response.ok().build();
    }

    // ── Overlays ─────────────────────────────────────────────────────────
    @PUT
    @Path("/hdNotes")
    public Response putHdNotes(JsonNode node, @HeaderParam("X-Actor-Hid") String actorHid) {
        write.putHdNotes(node, actorHid);
        return Response.ok().build();
    }

    @PUT
    @Path("/hdActions")
    public Response putHdActions(JsonNode node) {
        write.putHdActions(node);
        return Response.ok().build();
    }

    @PUT
    @Path("/hdPendientes")
    public Response putHdPendientes(JsonNode node, @HeaderParam("X-Actor-Hid") String actorHid) {
        write.putHdPendientes(node, actorHid);
        return Response.ok().build();
    }

    @PUT
    @Path("/weeklySupport")
    public Response putWeekly(JsonNode node, @QueryParam("equipo") String equipo, @HeaderParam("X-Actor-Hid") String actorHid) {
        write.putWeekly(node, equipo, actorHid);
        return Response.ok().build();
    }

    @PUT
    @Path("/progress")
    public Response putProgress(JsonNode node) {
        write.putProgress(node);
        return Response.ok().build();
    }

    @PUT
    @Path("/queries")
    public Response putQueries(JsonNode node) {
        write.putQueries(node);
        return Response.ok().build();
    }

    /** solNotes no tiene tabla en el modelo nacional; se acepta y se ignora (no-op). */
    @PUT
    @Path("/solNotes")
    public Response putSolNotes(JsonNode node) {
        return Response.ok().build();
    }
}
