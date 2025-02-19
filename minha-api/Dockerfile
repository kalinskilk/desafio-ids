# Usa a imagem do Maven com Java 17
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto
COPY pom.xml .
COPY src ./src


# Baixa as dependências antes de copiar o código-fonte (melhora performance no rebuild)
RUN mvn dependency:resolve


# Compila a aplicação
RUN mvn package -DskipTests

# Usa uma imagem menor para rodar a aplicação
FROM eclipse-temurin:17-jdk


# Copia o JAR gerado para a imagem final
COPY --from=build /app/target/quarkus-app/ /app/

# Comando para rodar a aplicação
CMD ["java", "-jar", "/app/quarkus-run.jar"]
