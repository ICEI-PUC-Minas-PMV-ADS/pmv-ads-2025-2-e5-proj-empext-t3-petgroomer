# ---------- Base de build ----------
FROM node:18-alpine AS deps
WORKDIR /app

# Copia só os manifests p/ aproveitar cache
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# ---------- Build ----------
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gera build do Nest e Prisma Client
RUN npx prisma generate \
 && npm run build

# ---------- Runner (produção) ----------
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Railway usará PORT, mas default ajuda local
ENV PORT=3000

# Copia apenas o necessário
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Script de entrada: aplica migrações e sobe app
COPY docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000
CMD ["./entrypoint.sh"]
