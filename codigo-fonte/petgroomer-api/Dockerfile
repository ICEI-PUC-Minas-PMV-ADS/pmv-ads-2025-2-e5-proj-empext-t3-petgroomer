FROM node:18-alpine

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma

# Instala todas as dependências (incluindo dev para build)
RUN npm ci --no-audit --no-fund

# Gera o cliente Prisma
RUN npx prisma generate

# Copia o código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Verifica se o build foi bem sucedido
RUN test -f dist/main.js || (echo "Build failed - dist/main.js not found" && exit 1)

# Limpa dependências de desenvolvimento (opcional)
RUN npm prune --production

EXPOSE 4000

# Seu entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]