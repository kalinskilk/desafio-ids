package com.meuprojeto.controllers;

import com.meuprojeto.dto.ProdutosDTO;
import com.meuprojeto.dto.ProdutosCreateOrUpdateDTO;
import com.meuprojeto.dto.ErrorResponse;

import com.meuprojeto.services.ProdutosService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.eclipse.microprofile.openapi.annotations.Operation;

@Path("/produtos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Produtos", description = "API para gerenciar produtos")
public class ProdutosResource {

    @Inject
    private ProdutosService produtosService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Lista todos os produtos", description = "Retorna uma lista de produtos cadastrados com filtros opcionais")
    public List<ProdutosDTO> findAll(
        @QueryParam("descricao") String descricao,
        @QueryParam("situacao") Boolean situacao
    ) {
        return produtosService.findAll(descricao, situacao);
    }

    @POST
    @Operation(summary = "Cria ou atualiza um produto", description = "Cria um novo produto ou atualiza um produto existente")
    public Response salvar(ProdutosCreateOrUpdateDTO produto) {
        produtosService.salvar(produto);
        return Response.status(Response.Status.CREATED).entity(produto).build();
    }

    @GET
    @Path("/{idProdutos}")
    @Operation(summary = "buscarPorId", description = "Pega dados de um produto pelo seu id")
    public Response buscarPorId(@PathParam("idProdutos") Long idProdutos) {
        ProdutosDTO produto = produtosService.buscarPorId(idProdutos);
        if (produto == null) {
        return Response.status(Response.Status.NOT_FOUND)
                       .entity(new ErrorResponse("Fornecedor não encontrado"))
                       .build();
         }
         return Response.ok(produto).build();
    }

    @DELETE
    @Path("/{idProdutos}")
    public Response deletar(@PathParam("idProdutos") Long idProdutos) {
         try {
            produtosService.deletar(idProdutos);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage()))
                    .build();
        }
    }
}
