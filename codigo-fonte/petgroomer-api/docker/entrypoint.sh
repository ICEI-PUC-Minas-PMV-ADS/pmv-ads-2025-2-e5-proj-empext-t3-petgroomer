#!/bin/sh
set -e

# Executa migrations se necessário
npx prisma migrate deploy

# Inicia a aplicação
exec node dist/main.js