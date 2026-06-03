#!/bin/sh
echo "Rodando migrations..."
npx prisma migrate deploy

echo "-------------------------------------"

echo "Rodando seed..."
pnpm seed

echo "-------------------------------------"

echo "Iniciando servidor..."
pnpm dev