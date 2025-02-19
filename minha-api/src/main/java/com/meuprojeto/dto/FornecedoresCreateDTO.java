package com.meuprojeto.dto;

import java.time.LocalDate;
import org.eclipse.microprofile.openapi.annotations.media.Schema;



public class FornecedoresCreateDTO {
 
    @Schema(description = "id do fornecedor, usado para atualizar os dados", example = "1") 
    public Long idFornecedores;
    

    @Schema(description = "Código do fornecedor", example = "123") 
    public String codigo;
  
    
    @Schema(description = "Razão Social do fornecedor", example = "Empresa XYZ") 
    private String razaoSocial;

  
    @Schema(description = "E-mail do fornecedor", example = "contato@empresa.com") 
    private String email;

  
    @Schema(description = "Telefone do fornecedor", example = "11999998888") 
    private String telefone;

    @Schema(description = "CNPJ do fornecedor", example = "12345678000199") 
    private String cnpj;


    @Schema(description = "Situação do fornecedor", example = "Ativo", enumeration = { "Ativo", "Baixado", "Suspenso" })
    private String situacao;

    @Schema(description = "Data da baixa, caso esteja inativo", example = "2025-01-01") 
    private LocalDate dataBaixa;
    
    // Getters e Setters

     public Long getIdFornecedores() {
        return idFornecedores;
    }

    public void setIdFornecedores(Long idFornecedores) {
        this.idFornecedores = idFornecedores;
    }
   
    
    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public LocalDate getDataBaixa() {
        return dataBaixa;
    }

    public void setDataBaixa(LocalDate dataBaixa) {
        this.dataBaixa = dataBaixa;
    }
}
