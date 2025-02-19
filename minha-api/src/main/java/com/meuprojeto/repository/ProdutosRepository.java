package com.meuprojeto.repository;

import com.meuprojeto.entities.ProdutosEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class ProdutosRepository implements PanacheRepository<ProdutosEntity> {
    public List<ProdutosEntity> listAll(String descricao, Boolean situacao) {
        Map<String, Object> params = new HashMap<>();
        String query = "1=1"; 

        if (descricao != null && !descricao.isEmpty()) {
            query += " AND UPPER(descricao) LIKE :descricao";
            params.put("descricao", "%" + descricao.toUpperCase() + "%");
        }

        if (situacao != null) {
            query += " AND situacao = :situacao";
            params.put("situacao", situacao);
        }

        return find(query, params).list();
    }

    @Transactional
     public void salvar(ProdutosEntity produto) {
        if (produto.getIdProdutos() == null) {
            persistAndFlush(produto);
        } else {
            getEntityManager().merge(produto); 
        }
    }
}