#!/bin/sh
set -e

echo "🚀 Iniciando aplicação PetGroomer..."

# Executar migrações do Prisma
echo "📦 Executando migrações do banco..."
npx prisma migrate deploy

# Executar seed se necessário
echo "🌱 Executando seed do banco..."
npx prisma db seed

# Iniciar a aplicação
echo "🎯 Iniciando servidor NestJS..."
exec node dist/main