package com.meuprojeto.dto;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

public class ProdutosCreateOrUpdateDTO {
    @Schema(description = "Id do produto. Opcional na criação de um produto", example = "1") 
    public Long idProdutos;

    @Schema(description = "Descrição do produto", example = "Coca Cola Lata 300ml") 
    public String descricao;

    @Schema(description = "Código do produto", example = "123") 
    public String codigo;

    @Schema(description = "Situacao do produto. true para ativo, false para inativo", example = "true", enumeration = { "true", "false" }) 
    public Boolean situacao;
}
