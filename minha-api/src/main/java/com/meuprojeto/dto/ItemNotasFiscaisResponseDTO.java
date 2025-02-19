package com.meuprojeto.dtos;

public class ItemNotasFiscaisResponseDTO {

    private Long idItemNotasFiscais;
    private Long idProdutos;
    private Double valorUnitario;
    private Double quantidade;
    private Double valorTotalItem;

    public ItemNotasFiscaisResponseDTO(Long idItemNotasFiscais, Long idProdutos, 
                                       Double valorUnitario, Double quantidade) {
        this.idItemNotasFiscais = idItemNotasFiscais;
        this.idProdutos = idProdutos;
        this.valorUnitario = valorUnitario;
        this.quantidade = quantidade;
        this.valorTotalItem = quantidade * valorUnitario;
    }

    public Long getIdItemNotasFiscais() {
        return idItemNotasFiscais;
    }

    public Long getIdProdutos() {
        return idProdutos;
    }

    public Double getValorUnitario() {
        return valorUnitario;
    }

    public Double getQuantidade() {
        return quantidade;
    }

    public Double getValorTotalItem() {
        return valorTotalItem;
    }
}
