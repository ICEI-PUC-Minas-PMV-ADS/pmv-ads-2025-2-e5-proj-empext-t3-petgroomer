#!/usr/bin/env sh
set -e

[ -f dist/main.js ] || { echo "ERRO: dist/main.js não encontrado"; ls -la; ls -la dist || true; exit 1; }

# espera DB responder usando Prisma
TRIES=30
until npx prisma db execute --stdin <<<'select 1;' >/dev/null 2>&1; do
  TRIES=$((TRIES-1)); [ "$TRIES" -le 0 ] && echo "DB não respondeu" && exit 1
  echo "DB ainda não pronto..."; sleep 2
done

echo "Aplicando migrations..."
npx prisma migrate deploy

echo "Starting Nest app..."
node dist/main.js
