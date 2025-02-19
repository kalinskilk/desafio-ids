package com.meuprojeto.dto;

import java.time.LocalDate;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

public class ItemNotasFiscaisCreateDTO {
    @Schema(description = "Valor unitario do item", example = "1.00") 
    private Double valorUnitario;

    @Schema(description = "Quantidade do item", example = "1.00") 
    private Double quantidade;

    @Schema(description = "Identificador do Produto", example = "1") 
    private Long idProdutos;

    public Long getIdProdutos() {
        return idProdutos;
    }

    public void setIdProdutos(Long idProdutos) {
        this.idProdutos = idProdutos;
    }

    public Double getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(Double valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Double quantidade) {
        this.quantidade = quantidade;
    }
}