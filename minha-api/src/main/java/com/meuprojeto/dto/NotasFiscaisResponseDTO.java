package com.meuprojeto.dtos;

import java.time.LocalDate;
import java.util.List;

public class NotasFiscaisResponseDTO {

    private Long idNotasFiscais;
    private String numeroNota;
    private LocalDate dataEmissao;
    private Double valorTotal;
    private Long idFornecedor;
    private List<ItemNotasFiscaisResponseDTO> itens;

    public NotasFiscaisResponseDTO(Long idNotasFiscais, String numeroNota, LocalDate dataEmissao, 
                                   Double valorTotal, Long idFornecedor, 
                                   List<ItemNotasFiscaisResponseDTO> itens) {
        this.idNotasFiscais = idNotasFiscais;
        this.numeroNota = numeroNota;
        this.dataEmissao = dataEmissao;
        this.valorTotal = valorTotal;
        this.idFornecedor = idFornecedor;
        this.itens = itens;
    }

    public Long getIdNotasFiscais() {
        return idNotasFiscais;
    }

    public String getNumeroNota() {
        return numeroNota;
    }

    public LocalDate getDataEmissao() {
        return dataEmissao;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public Long getIdFornecedor() {
        return idFornecedor;
    }

    public List<ItemNotasFiscaisResponseDTO> getItens() {
        return itens;
    }
}
