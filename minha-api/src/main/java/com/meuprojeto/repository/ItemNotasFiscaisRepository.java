package com.meuprojeto.repository;

import com.meuprojeto.entities.ItemNotasFiscaisEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class ItemNotasFiscaisRepository implements PanacheRepository<ItemNotasFiscaisEntity> {
     public List<ItemNotasFiscaisEntity> buscarItensPorNotaFiscal(Long idNotasFiscais) {
        return find("notasFiscais.idNotasFiscais", idNotasFiscais).list();
    }

    @Transactional
    public Boolean deletarItensByNotaFiscal(Long idNotasFiscais){
        Long count = delete("notasFiscais.idNotasFiscais", idNotasFiscais);
        return count > 0;
    }
}