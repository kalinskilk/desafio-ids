package com.meuprojeto.repository;

import com.meuprojeto.entities.NotasFiscaisEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class NotasFiscaisRepository implements PanacheRepository<NotasFiscaisEntity> {
    @Transactional
     public void salvar(NotasFiscaisEntity notaFiscal) {
        if (notaFiscal.getIdNotasFiscais() == null) {
            persistAndFlush(notaFiscal);
        } else {
            getEntityManager().merge(notaFiscal); 
        }
    }

    @Transactional
    public Boolean delete(Long idNotaFiscal){
      return deleteById(idNotaFiscal);
    }
}