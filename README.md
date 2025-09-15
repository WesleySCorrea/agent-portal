# AgentPortal

Um projeto frontend construído com **Angular**. Este projeto serve como interface de usuário para o sistema AgentPortal.

# 🐳 Guia de Execução do Frontend com Angular

Este documento explica como rodar o frontend do projeto utilizando Angular localmente.

---

## 1. Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 20+)
- [npm](https://www.npmjs.com/) (vem junto com Node.js)
- [Angular CLI](https://angular.io/cli) (apenas para rodar local sem Docker)

---

## 2. Estrutura do Frontend

O frontend está organizado seguindo o padrão Angular, com diretórios separados por responsabilidade:

```text
agent-portal
│
├─ src
│  ├─ app
│  │  ├─ components       # Componentes reutilizáveis da aplicação.
│  │  ├─ models           # Interfaces do sistema.
│  │  ├─ page             # Páginas da aplicação.
│  │  ├─ services         # Serviços Angular.
│  │  └─ utils            # Componentes utilizados em vários métodos.
│  └─ assets              # Arquivos estáticos (imagens, ícones, etc.)
│
├─ dist                  # Build de produção (gerado pelo Angular)
├─ package.json          # Dependências e scripts do npm
└─ README.md             # Este arquivo
```

---

## 3. Rodando localmente (sem Docker)

### 3.1 Instalação das dependências

No diretório raiz do projeto:

```bash
git clone <URL_DO_REPOSITORIO>

cd agent-portal

npm install
```

### 3.2 Executando o servidor de desenvolvimento

```bash
ng serve
```

### 3.3 Acesse a aplicação em:

```text
http://localhost:4200/
```

- O Angular recarrega automaticamente quando você modifica os arquivos do código-fonte.

---

## 4. Build de Produção

### 4.1 Para gerar os arquivos de produção do Angular:

```bash
ng build --prod
```

### 4.2 O build será gerado em:

```text
dist/agent-portal/browser
```

---

## 5. Rodando com Docker 🐳

- Caso queira rodar o frontend dentro de um container:

### 5.1 Build da imagem Docker

```bash
docker build -t agent-frontend-frontend .
```

### 5.2 Rodando com Docker Compose

```bash
docker compose up -d --build
```

### 5.3Acesse a aplicação em:

```text
http://localhost:4200/
```

---

## 6. Observações

- Certifique-se que a porta 4200 não está em uso.

- Para SPAs Angular, o Nginx ou servidor usado deve estar configurado com try_files $uri /index.html;.

- Sempre que alterar o build do Angular ou o nginx.conf, é necessário rebuildar a imagem Docker.
