package com.meuprojeto.enums;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.util.Arrays;

@Schema(enumeration = {"Ativo", "Baixado", "Suspenso"}, description = "Situação do fornecedor")
public enum FornecedoresSituacaoEnum {
    Ativo, Baixado, Suspenso;

    public static boolean isValida(String situacao) {
        if (situacao == null || situacao.trim().isEmpty()) {
            return true;
        }
        try {
            return Arrays.stream(FornecedoresSituacaoEnum.values())
                 .anyMatch(e -> e.name().equalsIgnoreCase(situacao.trim()));
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
