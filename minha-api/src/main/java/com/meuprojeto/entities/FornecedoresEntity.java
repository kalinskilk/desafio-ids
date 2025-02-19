package com.meuprojeto.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "FORNECEDORES")
public class FornecedoresEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fornecedores", nullable = false, unique = true)
    private Long idFornecedores;
    
    @Column(nullable = false, length = 255)
    private String codigo;

    @Column(name = "RAZAO_SOCIAL", nullable = false, length = 255)
    private String razaoSocial;

    @Column(name = "EMAIL", length = 150)
    private String email;

    @Column(name = "TELEFONE", length = 20)
    private String telefone;

    @Column(name = "CNPJ", length = 18, unique = true, nullable = false)
    private String cnpj;

    @Column(name = "SITUACAO", nullable = false)
    private String situacao;

    @Column(name = "DATA_BAIXA")
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
