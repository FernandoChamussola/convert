# Plataforma de Conversão de Arquivos

Plataforma web completa para conversão de arquivos com múltiplas funcionalidades.

## Funcionalidades

- **Imagens → PDF**: Converta múltiplas imagens em um único arquivo PDF
- **Word → PDF**: Converta documentos Word (.doc, .docx) para PDF
- **PDF → Word**: Converta arquivos PDF para documentos Word editáveis
  - ✨ **Conversão de alta qualidade** usando `pdf2docx`
  - Preserva formatação, imagens, tabelas e layout
  - Funciona com PDFs complexos

## Tecnologias

### Backend
- Node.js + Express
- LibreOffice (para conversão Word → PDF)
- Python + pdf2docx (para conversão PDF → Word de alta qualidade)
- PDFKit (para conversão de imagens)
- Multer (upload de arquivos)

### Frontend
- Next.js 16
- React 19
- TypeScript

## Pré-requisitos

- Docker
- Docker Compose

## Como executar com Docker

### 1. Clonar/acessar o repositório

```bash
cd "D:\projectos reais\converter"
```

### 2. Iniciar todos os serviços

```bash
docker-compose up --build
```

Ou em modo detached (background):

```bash
docker-compose up -d --build
```

### 3. Acessar a aplicação

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000

### 4. Parar os serviços

```bash
docker-compose down
```

Para parar e remover volumes:

```bash
docker-compose down -v
```

## Comandos úteis

### Ver logs

```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend
```

### Reconstruir containers

```bash
docker-compose up --build
```

### Executar comandos dentro dos containers

```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh
```

## Estrutura do projeto

```
converter/
├── backend/
│   ├── controller/
│   │   ├── convert.js (Imagens → PDF)
│   │   ├── wordToPdf.js
│   │   └── pdfToWord.js
│   ├── routes/
│   ├── config/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   └── convert/
│       ├── app/
│       │   ├── images-to-pdf/
│       │   ├── word-to-pdf/
│       │   ├── pdf-to-word/
│       │   └── components/
│       ├── Dockerfile
│       └── package.json
└── docker-compose.yml
```

## Endpoints da API

- `POST /convert/convert` - Converter imagens para PDF
- `POST /convert/word-to-pdf` - Converter Word para PDF
- `POST /convert/pdf-to-word` - Converter PDF para Word

## Volumes Docker

Os seguintes volumes são criados para persistência:
- `backend-uploads`: Arquivos enviados temporariamente
- `backend-pdfs`: PDFs gerados
- `backend-docs`: Documentos Word gerados

## Limites

- **Imagens**: Até 10 imagens, máximo 20MB cada
- **Documentos**: Até 50MB por arquivo

## Notas importantes

- O LibreOffice é instalado automaticamente no container do backend
- Os arquivos temporários são automaticamente removidos após o download
- As imagens são centralizadas nas páginas PDF com margens adequadas
