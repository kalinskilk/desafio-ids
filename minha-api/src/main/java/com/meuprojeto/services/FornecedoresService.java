package com.meuprojeto.services;

import com.meuprojeto.dto.FornecedoresDTO;
import com.meuprojeto.dto.FornecedoresCreateDTO;
import com.meuprojeto.entities.FornecedoresEntity;
import com.meuprojeto.enums.FornecedoresSituacaoEnum;
import com.meuprojeto.repository.FornecedoresRepository;

import com.meuprojeto.repository.NotasFiscaisRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class FornecedoresService {
    @Inject
    FornecedoresRepository repository;

    @Inject
    NotasFiscaisRepository notasFiscaisRepository;

    public List<FornecedoresDTO> findAll(String situacao) {
        if (situacao !=null &&!FornecedoresSituacaoEnum.isValida(situacao)) {
             throw new BadRequestException("Situação inválida! Valores aceitos: Ativo, Baixado, Suspenso.");
        } 
        return repository.listAll(situacao).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FornecedoresDTO buscarPorId(Long idFornecedores) {
        FornecedoresEntity entity = repository.findById(idFornecedores);
        return entity != null ? convertToDTO(entity) : null;
    }

    @Transactional
    public Boolean salvar(FornecedoresCreateDTO dto) {
        if (this.existsByCnpjExcludingId(dto.getCnpj(),dto.getIdFornecedores())) {
            throw new BadRequestException("Já existe um fornecedor cadastrado com este CNPJ.");
        }
        FornecedoresEntity fornecedor = new FornecedoresEntity();
        if(dto.getIdFornecedores() != null){
         fornecedor.setIdFornecedores(dto.getIdFornecedores());
        }
        fornecedor.setCodigo(dto.getCodigo());
        fornecedor.setRazaoSocial(dto.getRazaoSocial());
        fornecedor.setEmail(dto.getEmail());
        fornecedor.setTelefone(dto.getTelefone());
        fornecedor.setCnpj(dto.getCnpj());
        fornecedor.setSituacao(dto.getSituacao());
        fornecedor.setDataBaixa(dto.getDataBaixa());

        repository.salvar(fornecedor);

        return true;
    }

    public boolean existsByCnpjExcludingId(String cnpj, Long idFornecedores) {
        if(idFornecedores != null){
            return repository.count("cnpj = ?1 and idFornecedores != ?2", cnpj, idFornecedores) > 0;
        }else{
            return repository.count("cnpj", cnpj) > 0;
        }
    }

    @Transactional
    public Boolean deletar(Long idFornecedores) {
        if(this.validaMovimentacoes(idFornecedores)){
            throw new BadRequestException("O fornecedor possui movimentações cadastradas.");
        }
        return repository.deleteById(idFornecedores);
    }

    private Boolean validaMovimentacoes(Long idFornecedores) {
        return notasFiscaisRepository.count("fornecedores.idFornecedores", idFornecedores) > 0;
    }

    private FornecedoresDTO convertToDTO(FornecedoresEntity entity) {
        FornecedoresDTO dto = new FornecedoresDTO();

        dto.idFornecedores = entity.getIdFornecedores();
        dto.codigo = entity.getCodigo();
        dto.razaoSocial = entity.getRazaoSocial();
        dto.email = entity.getEmail();
        dto.telefone = entity.getTelefone();
        dto.cnpj = entity.getCnpj();
        dto.situacao = entity.getSituacao();
        dto.dataBaixa = entity.getDataBaixa();

        return dto;
    }

    private FornecedoresEntity convertToEntity(FornecedoresDTO dto) {
        FornecedoresEntity entity = new FornecedoresEntity();

        entity.setCodigo(dto.codigo);
        entity.setRazaoSocial(dto.razaoSocial);
        entity.setEmail(dto.email);
        entity.setTelefone(dto.telefone);
        entity.setCnpj(dto.cnpj);
        entity.setSituacao(dto.situacao);
        entity.setDataBaixa(dto.dataBaixa);
        
        return entity;
    }
}
