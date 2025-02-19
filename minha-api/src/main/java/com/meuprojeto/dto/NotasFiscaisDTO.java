package com.meuprojeto.dto;

import java.time.LocalDate;
import org.eclipse.microprofile.openapi.annotations.media.Schema;


public class NotasFiscaisDTO {
    @Schema(description = "Id da nota fiscal", example = "1") 
    public Long idNotasFiscais;

    @Schema(description = "Número da nota fiscal", example = "123") 
    public String numeroNota;

    @Schema(description = "Número da nota fiscal", example = "2025-02-14") 
    public LocalDate dataEmissao;

    @Schema(description = "Valor Total da nota", example = "99.99") 
    public Double valorTotal;

    @Schema(description = "id do fornecedor", example = "1") 
    public Long idFornecedor;

    @Schema(description = "Razão social do fornecedor", example = "Empresa XYZ") 
    public String razaoSocial;
}