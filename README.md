# EcoRoute - Sistema de Gerenciamento de Coleta

Este é o frontend do sistema EcoRoute, desenvolvido em Angular 17.

## Requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior

## Instalação

1. Clone o repositório
2. Navegue até a pasta do projeto
3. Instale as dependências:
```bash
npm install
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:4200`.

## Build

Para gerar uma versão de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/front-end-pi`.

## Testes

Para executar os testes:

```bash
npm test
```

## Estrutura do Projeto

- `src/app/components`: Componentes reutilizáveis
- `src/app/pages`: Páginas da aplicação
- `src/app/models`: Interfaces e tipos
- `src/app/services`: Serviços para comunicação com a API
- `src/environments`: Configurações de ambiente

## Funcionalidades

- Gerenciamento de Bairros
- Gerenciamento de Caminhões
- Gerenciamento de Pontos de Coleta
- Gerenciamento de Rotas

## Tecnologias Utilizadas

- Angular 17
- TypeScript
- CSS
- RxJS
- Angular Router
- Angular Forms
