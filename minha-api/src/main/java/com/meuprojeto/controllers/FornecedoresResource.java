package com.meuprojeto.controllers;

import com.meuprojeto.dto.FornecedoresDTO;
import com.meuprojeto.dto.FornecedoresCreateDTO;
import com.meuprojeto.dto.ErrorResponse;
import com.meuprojeto.enums.FornecedoresSituacaoEnum;;

import com.meuprojeto.services.FornecedoresService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.util.List;


@Path("/fornecedores")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Fornecedores", description = "Gerenciamento de fornecedores")
public class FornecedoresResource {

    @Inject
    private FornecedoresService service;

    @GET
    @Schema(enumeration = {"Ativo", "Baixado", "Suspenso"}, description = "Situação do fornecedor")
    public Response findAll(
        @Parameter(
            description = "Situação do fornecedor",
            schema = @Schema(implementation = FornecedoresSituacaoEnum.class)
        )
        @QueryParam("situacao") String situacao
    ) {
        try {
            return Response.ok(service.findAll(situacao)).build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }

    }

    @GET
    @Path("/{idFornecedores}")
    public Response buscarPorId(@PathParam("idFornecedores") Long idFornecedores) {
        FornecedoresDTO fornecedor = service.buscarPorId(idFornecedores);
        if (fornecedor == null) {
        return Response.status(Response.Status.NOT_FOUND)
                       .entity(new ErrorResponse("Fornecedor não encontrado"))
                       .build();
         }
         return Response.ok(fornecedor).build();
    }

    @POST
    @Operation(summary = "Cria um novo fornecedor")
    public Response salvar(FornecedoresCreateDTO dto) {
        try {
            return Response.status(Response.Status.CREATED).entity(service.salvar(dto)).build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }

    @DELETE
    @Path("/{idFornecedores}")
    public Response deletar(@PathParam("idFornecedores") Long idFornecedores) {
         try {
            service.deletar(idFornecedores);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }
}
