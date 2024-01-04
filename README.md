# Instalando as dependências da aplicação

### `npm install`

## Iniciando Banco de dados

Realize a instalação do XAMPP, iniciando o MySql, crie um banco com o nome `resultado`
ao criar execute o seguinte sql:

`CREATE TABLE Resultado (
  id VARCHAR(36) PRIMARY KEY,
  bimestre ENUM('PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO') NOT NULL,
  disciplina ENUM('Biologia', 'Artes', 'Geografia', 'Sociologia') NOT NULL,
  nota FLOAT NOT NULL CHECK (nota >= 0 AND nota <= 10),
  criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`

## Vídeo mostrando funcionamento do projeto

https://www.youtube.com/watch?v=Ed35hgsbZO0

## Iniciando a aplicação

### `npm run dev`

## Versões utilizadas

Node: `v20.9.0`

npm: `10.1.0`
