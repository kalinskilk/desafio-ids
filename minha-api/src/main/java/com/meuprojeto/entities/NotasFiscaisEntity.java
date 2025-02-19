package com.meuprojeto.entities;

import com.meuprojeto.entities.FornecedoresEntity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "NOTAS_FISCAIS")
public class NotasFiscaisEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_NOTAS_FISCAIS", nullable = false, unique = true)
    private Long idNotasFiscais;

    @Column(name = "NUMERO_NOTA", nullable = false)
    private String numeroNota;

    @Column(name = "DATA_EMISSAO", nullable = false)
    private LocalDate dataEmissao;

    @Column(name = "VALOR_TOTAL", nullable = false)
    private Double valorTotal;

     /* RELATIONS */

    @ManyToOne
    @JoinColumn(name = "ID_FORNECEDORES", nullable = false)
    private FornecedoresEntity fornecedores;

    // Getters e Setters
    public Long getIdNotasFiscais() {
        return idNotasFiscais;
    }

    public void setIdNotasFiscais(Long idNotasFiscais) {
        this.idNotasFiscais = idNotasFiscais;
    }

    public String getNumeroNota() {
        return numeroNota;
    }

    public void setNumeroNota(String numeroNota) {
        this.numeroNota = numeroNota;
    }

    public LocalDate getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(LocalDate dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public FornecedoresEntity getFornecedores() {
        return fornecedores;
    }

    public void setFornecedores(FornecedoresEntity fornecedores) {
        this.fornecedores = fornecedores;
    }
}