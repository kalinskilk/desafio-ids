# Como Rodar o Projeto com Docker

Este documento explica como configurar e rodar o projeto utilizando Docker. O projeto é composto por:

- **Backend**: Java com Quarkus e Swagger
- **Frontend**: Angular com PrimeNG

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração do Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto, ou simplesmente renomeie o arquivo `.env.example` para `.env`, e defina as variáveis de ambiente necessárias:

```
# Configuração do PostgreSQL
POSTGRES_USER=meu_usuario
POSTGRES_PASSWORD=minha_senha
POSTGRES_DB=desafio_ids

# Configuração do backend
QUARKUS_DATASOURCE_USERNAME=meu_usuario
QUARKUS_DATASOURCE_PASSWORD=minha_senha
QUARKUS_DATASOURCE_JDBC_URL=jdbc:postgresql://banco:5432/desafio_ids
```

## Rodando o Projeto

Para iniciar os containers, execute:

```sh
docker-compose up -d --build
```

Para verificar se os containers estão rodando:

```sh
docker ps
```

## Acessando o Projeto

- **Backend (Swagger UI)**: [http://localhost:8080/q/swagger-ui](http://localhost:8080/q/swagger-ui)
- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Banco de Dados**: Disponível na porta `5432`

## Parando os Containers

Para parar os containers:

```sh
docker-compose down
```

Para remover volumes persistentes:

```sh
docker-compose down -v
```

## Logs do Backend

Se precisar ver os logs do backend em tempo real:

```sh
docker logs -f <CONTAINER_ID_BACKEND>
```

Para listar os IDs dos containers ativos:

```sh
docker ps
```

# Sobre o desafio

## Tecnologias a serem utilizadas

- **Front-End**: Angular + PrimeNG
- **Back-End**: API Java Nativo + Quarkus
- **Banco de Dados**: PostgreSQL
- **Documentação da API**: Swagger (Obrigatório)
- **Diferencial (não obrigatório)**: Testes unitários no backend

## Observação

Não utilizar frameworks Java como Spring ou qualquer outro.

# Tasklist

## Cadastro de Produto

- ✅ Criar campo para **Código**
- ✅ Criar campo para **Descrição**
- ✅ Criar campo para **Situação** (Ativo, Inativo)
- ✅ Implementar funcionalidade para **pesquisar produtos**
- ✅ Permitir **Inclusão** de produtos
- ✅ Permitir **Edição** de produtos
- ✅ Permitir **Exclusão** de produtos
- ✅ Validar exclusão: **Não permitir excluir um produto que já teve movimentação**

## Cadastro de Fornecedor

- ✅ Criar campo para **Código**
- ✅ Criar campo para **Razão Social**
- ✅ Criar campo para **E-Mail**
- ✅ Criar campo para **Telefone**
- ✅ Criar campo para **CNPJ**
- ✅ Criar campo para **Situação** (Ativo, Baixado, Suspenso)
- ✅ Criar campo para **Data da Baixa**
- ✅ Implementar funcionalidade para **pesquisar fornecedores**
- ✅ Permitir **Inclusão** de fornecedores
- ✅ Permitir **Edição** de fornecedores
- ✅ Permitir **Exclusão** de fornecedores
- ✅ Validar CNPJ: **Não permitir mais de um fornecedor com o mesmo CNPJ**
- ✅ Validar exclusão: **Não permitir excluir fornecedor que já teve movimentação**

## Entrada de Nota Fiscal

### Informações da Nota

- ✅ Criar campo para **Número da nota**
- ✅ Criar campo para **Data e Horário de Emissão**
- ✅ Criar campo para **Fornecedor**
- ✅ Criar campo para **Endereço**
- ✅ Criar campo para **Valor Total da Nota**

### Itens da Nota Fiscal

- ✅ Criar campo para **Produto**
- ✅ Criar campo para **Valor Unitário**
- ✅ Criar campo para **Quantidade**
- ✅ Calcular e exibir **Valor Total do Item** (quantidade x valor unitário)

### Funcionalidades

- ✅ Implementar funcionalidade para **pesquisar notas fiscais**
- ✅ Permitir **Inclusão** de notas fiscais
- ✅ Permitir **Edição** de notas fiscais
- ✅ Permitir **Exclusão** de notas fiscais
- ✅ Permitir **Inclusão** de itens na nota fiscal
- ✅ Permitir **Edição** de itens na nota fiscal
- ✅ Permitir **Exclusão** de itens na nota fiscal
