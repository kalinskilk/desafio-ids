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
