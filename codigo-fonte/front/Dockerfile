FROM node:18-alpine

WORKDIR /app

# Copia arquivos de configuração
COPY package*.json ./
COPY next.config.js ./
COPY tsconfig.json ./
COPY babel.config.js ./

# Instala dependências
RUN npm ci --include=dev --no-audit --no-fund

# Copia código fonte
COPY . .

# Build da aplicação
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]