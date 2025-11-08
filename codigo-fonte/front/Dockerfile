FROM node:18-alpine

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./
COPY next.config.js ./
COPY tsconfig.json ./

# Instala dependências
RUN npm ci --no-audit --no-fund

# Copia código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Expõe a porta
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "start"]