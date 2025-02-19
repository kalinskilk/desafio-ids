package com.meuprojeto.repository;

import com.meuprojeto.entities.FornecedoresEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@ApplicationScoped
public class FornecedoresRepository implements PanacheRepository<FornecedoresEntity> {
    public List<FornecedoresEntity> listAll(String situacao) {
        Map<String, Object> params = new HashMap<>();
        String query = "1=1"; 

        if (situacao != null && !situacao.isEmpty()) {
            query += " AND UPPER(situacao) = :situacao";
            params.put("situacao", situacao.toUpperCase());
        }
        
        return find(query, params).list();
    }

    @Transactional
     public void salvar(FornecedoresEntity fornecedoresEntity) {
        if (fornecedoresEntity.getIdFornecedores() == null) {
            persistAndFlush(fornecedoresEntity);
        } else {
            getEntityManager().merge(fornecedoresEntity); 
        }
    }
}