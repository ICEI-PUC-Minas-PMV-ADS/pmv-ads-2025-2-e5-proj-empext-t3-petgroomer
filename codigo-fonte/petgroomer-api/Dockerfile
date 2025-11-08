# ---------- Base ----------
FROM node:18-alpine AS base
WORKDIR /app

# Copia apenas os manifests primeiro
COPY codigo-fonte/petgroomer-api/package*.json ./

# Instala dependências
RUN npm ci

# Copia o restante do código
COPY codigo-fonte/petgroomer-api .

# Gera Prisma antes da build
RUN npx prisma generate

# Compila o NestJS
RUN npm run build

# ---------- Runtime ----------
FROM node:18-alpine
WORKDIR /app

# Copia o build e node_modules da fase anterior
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma

# Define porta padrão
ENV PORT=4000
EXPOSE 4000

# Executa
CMD ["node", "dist/main.js"]
