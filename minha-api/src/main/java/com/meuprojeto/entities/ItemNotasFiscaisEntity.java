package com.meuprojeto.entities;

import com.meuprojeto.entities.ProdutosEntity;
import com.meuprojeto.entities.NotasFiscaisEntity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ITEM_NOTAS_FISCAIS")
public class ItemNotasFiscaisEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ITEM_NOTAS_FISCAIS", nullable = false, unique = true)
    private Long idItemNotasFiscais;

    @Column(name = "VALOR_UNITARIO", nullable = false)
    private Double valorUnitario;

    @Column(name = "QUANTIDADE", nullable = false)
    private Double quantidade;

    //RELATIONS
    @ManyToOne
    @JoinColumn(name = "ID_PRODUTOS", nullable = false)
    private ProdutosEntity produtos;

    @ManyToOne
    @JoinColumn(name = "ID_NOTAS_FISCAIS", nullable = false)
    private NotasFiscaisEntity notasFiscais;

    // Getters e Setters
    public Long getIdItemNotasFiscais() {
        return idItemNotasFiscais;
    }

    public void setIdItemNotasFiscais(Long idItemNotasFiscais) {
        this.idItemNotasFiscais = idItemNotasFiscais;
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

     public ProdutosEntity getProdutos() {
        return produtos;
    }

    public void setProdutos(ProdutosEntity produtos) {
        this.produtos = produtos;
    }

    public NotasFiscaisEntity getNotasFiscais() {
        return notasFiscais;
    }

    public void setNotasFiscais(NotasFiscaisEntity notasFiscais) {
        this.notasFiscais = notasFiscais;
    }
}