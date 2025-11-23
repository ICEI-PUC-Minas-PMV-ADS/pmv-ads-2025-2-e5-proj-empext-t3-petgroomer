FROM node:18-alpine

WORKDIR /app

# Copia arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instala todas as dependências (INCLUINDO dev para build)
RUN npm ci --include=dev --no-audit --no-fund

RUN npm install -g @prisma/client prisma

# Copia código fonte e prisma
COPY src ./src
COPY prisma ./prisma

# Gera cliente Prisma
RUN npx prisma generate

# Build usando Nest CLI diretamente (mais confiável)
RUN npx nest build -p tsconfig.build.json

# Verifica se o build foi bem sucedido
RUN ls -la dist/ && test -f dist/main.js

EXPOSE 4000

# Entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]