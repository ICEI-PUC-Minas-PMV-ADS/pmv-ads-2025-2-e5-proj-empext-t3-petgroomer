FROM node:18-alpine AS builder

WORKDIR /app

# Copia arquivos de configuração primeiro (cache eficiente)
COPY package*.json ./
COPY next.config.js ./
COPY tsconfig.json ./
COPY .eslintrc.json ./

# Instala TODAS as dependências (incluindo dev)
RUN npm ci --no-audit --no-fund

# Copia o código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Runtime
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Instala apenas dependências de produção
COPY package*.json ./
RUN npm ci --production --no-audit --no-fund

# Copia os arquivos built
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

EXPOSE 3000

CMD ["npm", "start"]