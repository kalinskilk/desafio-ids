package com.meuprojeto.services;

import com.meuprojeto.entities.NotasFiscaisEntity;
import com.meuprojeto.entities.FornecedoresEntity;
import com.meuprojeto.entities.ProdutosEntity;
import com.meuprojeto.entities.ItemNotasFiscaisEntity;

import com.meuprojeto.dto.NotasFiscaisCreateDTO;
import com.meuprojeto.dto.NotasFiscaisDTO;
import com.meuprojeto.dto.ItemNotasFiscaisCreateDTO;
import com.meuprojeto.dtos.ItemNotasFiscaisResponseDTO;
import com.meuprojeto.dtos.NotasFiscaisResponseDTO;

import com.meuprojeto.repository.NotasFiscaisRepository;
import com.meuprojeto.repository.FornecedoresRepository;
import com.meuprojeto.repository.ItemNotasFiscaisRepository;
import com.meuprojeto.repository.ProdutosRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class NotasFiscaisService {

    @Inject
    NotasFiscaisRepository notasFiscaisRepository;
    
    @Inject
    FornecedoresRepository fornecedoresRepository;

    @Inject
    ItemNotasFiscaisRepository itemNotasFiscaisRepository;
    
    @Inject
    ProdutosRepository produtosRepository;

    @Transactional
    public Boolean salvar(NotasFiscaisCreateDTO notasFiscaisCreate){
        NotasFiscaisEntity notaFiscalEntity = new NotasFiscaisEntity();
        if(notasFiscaisCreate.getIdNotasFiscais() != null && notasFiscaisCreate.getIdNotasFiscais() > 0){
          notaFiscalEntity.setIdNotasFiscais(notasFiscaisCreate.getIdNotasFiscais());
          itemNotasFiscaisRepository.deletarItensByNotaFiscal(notasFiscaisCreate.getIdNotasFiscais()); // deleta os itens para recriar
        }
        notaFiscalEntity.setNumeroNota(notasFiscaisCreate.getNumeroNota());
        notaFiscalEntity.setDataEmissao(notasFiscaisCreate.getDataEmissao());
        notaFiscalEntity.setValorTotal(notasFiscaisCreate.getValorTotal());

        FornecedoresEntity fornecedor = fornecedoresRepository.findById(notasFiscaisCreate.getIdFornecedor());
        if(fornecedor == null){
            throw new BadRequestException("Fornecedor não encontrado");
        }
        this.validarCriacaoItens(notasFiscaisCreate);
        notaFiscalEntity.setFornecedores(fornecedor);
        notasFiscaisRepository.salvar(notaFiscalEntity);
        this.criarItens(notaFiscalEntity, notasFiscaisCreate.getItensNotasFiscais());
        return true;
    }

   private void validarCriacaoItens(NotasFiscaisCreateDTO notasFiscaisCreate) {
    if (notasFiscaisCreate.getItensNotasFiscais().isEmpty()) {
        throw new BadRequestException("A nota fiscal deve ter pelo menos um item.");
    }

    for (ItemNotasFiscaisCreateDTO item : notasFiscaisCreate.getItensNotasFiscais()) {
        if (item.getIdProdutos() == null || item.getIdProdutos() <= 0) {
            throw new BadRequestException("O item deve ter um produto válido.");
        }

        if (item.getQuantidade() == null || item.getQuantidade() <= 0) {
            throw new BadRequestException("O item deve ter uma quantidade maior que zero.");
        }

        if (item.getValorUnitario() == null || item.getValorUnitario() <= 0) {
            throw new BadRequestException("O item deve ter um valor unitário maior que zero.");
        }

        ProdutosEntity produto = produtosRepository.findById(item.getIdProdutos());
        if (produto == null) {
            throw new BadRequestException("Produto " + item.getIdProdutos() + " não encontrado.");
        }
    }
   }

   private void criarItens(NotasFiscaisEntity notasFiscais, List<ItemNotasFiscaisCreateDTO> itens) {
        for (ItemNotasFiscaisCreateDTO item : itens) {
            ItemNotasFiscaisEntity itemNotasFiscais = new ItemNotasFiscaisEntity();
            itemNotasFiscais.setQuantidade(item.getQuantidade());
            itemNotasFiscais.setValorUnitario(item.getValorUnitario());
            itemNotasFiscais.setProdutos(produtosRepository.findById(item.getIdProdutos()));
            itemNotasFiscais.setNotasFiscais(notasFiscais);
            itemNotasFiscaisRepository.persist(itemNotasFiscais);
        }
   }

    public List<NotasFiscaisDTO> findAll(){
         return notasFiscaisRepository.listAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    } 

     private NotasFiscaisDTO convertToDTO(NotasFiscaisEntity entity) {
        NotasFiscaisDTO dto = new NotasFiscaisDTO();

        dto.idNotasFiscais = entity.getIdNotasFiscais();
        dto.numeroNota = entity.getNumeroNota();
        dto.dataEmissao = entity.getDataEmissao();
        dto.valorTotal = entity.getValorTotal();
        dto.idFornecedor = entity.getFornecedores().getIdFornecedores();
        dto.razaoSocial = entity.getFornecedores().getRazaoSocial();
        return dto;
    }

    public NotasFiscaisResponseDTO buscarNotaFiscalPorId(Long idNotasFiscais) {
        NotasFiscaisEntity notaFiscal = notasFiscaisRepository.findById(idNotasFiscais);

        if (notaFiscal == null) {
            throw new NotFoundException("Nota Fiscal com ID " + idNotasFiscais + " não encontrada.");
        }

        List<ItemNotasFiscaisResponseDTO> itensDTO = this.buscarItensPorNotaFiscal(idNotasFiscais);

        return new NotasFiscaisResponseDTO(
            notaFiscal.getIdNotasFiscais(),
            notaFiscal.getNumeroNota(),
            notaFiscal.getDataEmissao(),
            notaFiscal.getValorTotal(),
            notaFiscal.getFornecedores().getIdFornecedores(),
            itensDTO
        );
    }

  public List<ItemNotasFiscaisResponseDTO> buscarItensPorNotaFiscal(Long idNotaFiscal) {
        return itemNotasFiscaisRepository.buscarItensPorNotaFiscal(idNotaFiscal)
            .stream()
            .map(item -> new ItemNotasFiscaisResponseDTO(
                item.getIdItemNotasFiscais(),
                item.getProdutos() != null ? item.getProdutos().getIdProdutos() : null,
                item.getValorUnitario(),
                item.getQuantidade()
            ))
            .collect(Collectors.toList());
    }

    public Boolean deletar(Long idNotaFiscal) {
        itemNotasFiscaisRepository.deletarItensByNotaFiscal(idNotaFiscal); 
        return notasFiscaisRepository.delete(idNotaFiscal);
    }
}
