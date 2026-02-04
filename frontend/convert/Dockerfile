FROM node:20-alpine

# Criar diretório da aplicação
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Expor porta
EXPOSE 3001

# Comando para iniciar em modo desenvolvimento
CMD ["npm", "run", "dev"]
