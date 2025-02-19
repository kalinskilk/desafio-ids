package com.meuprojeto.dto;

import java.time.LocalDate;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import com.meuprojeto.entities.ItemNotasFiscaisEntity;

import java.util.List;

public class NotasFiscaisCreateDTO {
    @Schema(description = "Id da nota fiscal utilizado para atualizar a nota fiscal", example = "123",required = false) 
    public Long idNotasFiscais;

    @Schema(description = "Número da nota fiscal", example = "123") 
    public String numeroNota;

    @Schema(description = "Número da nota fiscal", example = "2025-02-14") 
    public LocalDate dataEmissao;

    @Schema(description = "Valor Total da nota", example = "99.99") 
    public Double valorTotal;

    @Schema(description = "id do fornecedor", example = "1") 
    public Long idFornecedor;

    @Schema(description = "Lista de itens da nota", example = "[{ \"valorUnitario\": 1.00, \"quantidade\": 1.00, \"idProdutos\": 1 }]") 
    public List<ItemNotasFiscaisCreateDTO> itensNotasFiscais;


    public Long getIdNotasFiscais(){
        return idNotasFiscais;
    }
    
    public String getNumeroNota(){
        return numeroNota;
    }

    public LocalDate getDataEmissao(){
        return dataEmissao;
    }

    public Double getValorTotal(){    
        return valorTotal;
    }

    public Long getIdFornecedor(){
        return idFornecedor;
    }

    public List<ItemNotasFiscaisCreateDTO> getItensNotasFiscais(){
        return itensNotasFiscais;
    }
}