FROM node:18-bullseye

# Instalar LibreOffice, Python e dependências
RUN apt-get update && apt-get install -y \
    libreoffice \
    libreoffice-writer \
    python3 \
    python3-pip \
    libheif-dev \
    libvips-dev \
    librsvg2-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar pdf2docx com versões compatíveis
# PyMuPDF 1.23.x tem compatibilidade melhor com pdf2docx
RUN pip3 install --no-cache-dir PyMuPDF==1.23.26 pdf2docx==0.5.8

# Instalar rembg para remoção de fundo e Pillow para manipulação de imagens
RUN pip3 install --no-cache-dir rembg[cpu]==2.0.50 pillow>=10.0.0

# Criar diretório da aplicação
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Criar diretórios necessários
RUN mkdir -p src/uploads src/pdfs src/docs src/images src/icons

# Expor porta
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "run", "dev"]
