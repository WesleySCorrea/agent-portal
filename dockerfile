# Estágio de build
FROM node:20-alpine as build

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Build Angular (gera arquivos em dist/agent-portal/browser)
RUN npm run build -- --output-path=dist/agent-portal/browser --base-href=/
# ADICIONE ESTA LINHA PARA DEPURAR A SAÍDA DO BUILD:
RUN find /app/dist/agent-portal/browser -print -exec ls -ld {} +


# Estágio de produção
FROM nginx:alpine

# REMOVER O CONTEÚDO PADRÃO DO NGINX ANTES DE COPIAR OS NOVOS ARQUIVOS
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos finais do Angular para o Nginx
COPY --from=build /app/dist/agent-portal/browser/. /usr/share/nginx/html

# Remove config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]