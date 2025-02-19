package com.meuprojeto.services;

import com.meuprojeto.dto.ProdutosCreateOrUpdateDTO;
import com.meuprojeto.dto.ProdutosDTO;
import com.meuprojeto.entities.ProdutosEntity;
import com.meuprojeto.repository.ProdutosRepository;
import com.meuprojeto.repository.ItemNotasFiscaisRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProdutosService {

    @Inject
    ProdutosRepository produtosRepository;

    @Inject
    ItemNotasFiscaisRepository itemNotasFiscaisRepository;

    public List<ProdutosDTO> findAll(String descricao, Boolean situacao) {
        return produtosRepository.listAll(descricao, situacao).stream()
            .map(produto -> {
                ProdutosDTO dto = new ProdutosDTO();
                dto.idProdutos = produto.getIdProdutos();
                dto.codigo = produto.getCodigo();
                dto.descricao = produto.getDescricao();
                dto.situacao = produto.getSituacao();
                return dto;
            }).collect(Collectors.toList());
    }

    public void salvar(ProdutosCreateOrUpdateDTO dto) {
        ProdutosEntity produto = new ProdutosEntity();
        if(dto.idProdutos != null) {
            produto.setIdProdutos(dto.idProdutos);
        }
        produto.setDescricao(dto.descricao);
        produto.setSituacao(dto.situacao);
        produto.setCodigo(dto.codigo);
        produtosRepository.salvar(produto);
    }

    public ProdutosDTO buscarPorId(Long idProdutos) {
        ProdutosEntity entity = produtosRepository.findById(idProdutos);
        return entity != null ? this.convertToDTO(entity) : null;
    }

    private ProdutosDTO convertToDTO(ProdutosEntity entity) {
        ProdutosDTO dto = new ProdutosDTO();

        dto.idProdutos = entity.getIdProdutos();
        dto.descricao = entity.getDescricao();
        dto.situacao = entity.getSituacao();
        dto.codigo = entity.getCodigo();

        return dto;
    }

    @Transactional
    public Boolean deletar(Long idProdutos) {
        if (this.existeMovimentacao(idProdutos)) {
            throw new BadRequestException("O produto não pode ser deletado pois já possui movimentações.");
        }
        return produtosRepository.deleteById(idProdutos);
    }

    public boolean existeMovimentacao(Long idProdutos) {
        return itemNotasFiscaisRepository.count("produtos.idProdutos", idProdutos) > 0;
    }
}
