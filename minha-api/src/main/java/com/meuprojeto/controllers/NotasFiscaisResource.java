package com.meuprojeto.controllers;

import com.meuprojeto.dto.NotasFiscaisCreateDTO; 
import com.meuprojeto.dto.NotasFiscaisDTO;
import com.meuprojeto.dtos.NotasFiscaisResponseDTO;

import com.meuprojeto.dto.ErrorResponse;

import com.meuprojeto.services.NotasFiscaisService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.eclipse.microprofile.openapi.annotations.Operation;



@Path("/notasfiscais")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Notas Fiscais", description = "API para gerenciar Notas Fiscais")
public class NotasFiscaisResource {

    @Inject
    private NotasFiscaisService notasFiscaisService;

    @GET
    @Operation(summary = "Lista as notas fiscais")
    public List<NotasFiscaisDTO> findAll() {
        return notasFiscaisService.findAll();
    }

    @POST
    @Operation(summary = "Cria uma nova nota fiscal")
    public Response salvar(NotasFiscaisCreateDTO dto) {
        try {
            return Response.status(Response.Status.CREATED).entity(notasFiscaisService.salvar(dto)).build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @GET
    @Path("/{idNotasFiscais}")
    @Operation(summary = "Buscar Nota Fiscal por ID", description = "Retorna os detalhes da nota fiscal junto com seus itens.")
    public Response buscarNotaFiscalPorId(@PathParam("idNotasFiscais") Long idNotasFiscais) {
        try {
             NotasFiscaisResponseDTO notaFiscal= notasFiscaisService.buscarNotaFiscalPorId(idNotasFiscais);
             return Response.ok(notaFiscal).build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @DELETE
    @Path("/{idNotasFiscais}")
    public Response deletar(@PathParam("idNotasFiscais") Long idNotasFiscais) {
         try {
            notasFiscaisService.deletar(idNotasFiscais);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }
}