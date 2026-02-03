# Vehicles App - Fullstack

Sistema completo de gerenciamento de veículos com backend Node.js + Express + MongoDB e frontend (a ser implementado).

## 🚀 Quick Start com Docker

```bash
# Subir toda a aplicação (backend + MongoDB)
docker-compose up -d

# Acessar
# API: http://localhost:3000
# Swagger: http://localhost:3000/api-docs
```

## 📁 Estrutura do Projeto

```
vehicles-app/
├── docker-compose.yml    # Orquestração de containers
└── backend/              # API REST Node.js + Express + TypeScript + MongoDB
    ├── Dockerfile
    ├── src/
    ├── test/
    ├── package.json
    └── README.md
```

## 🛠️ Tecnologias

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Docker** + **Docker Compose**
- **Swagger** (documentação interativa)
- **Mocha** + **Chai** + **Supertest** (testes)

## 🐳 Docker

### Comandos principais

```bash
# Iniciar aplicação
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar aplicação
docker-compose down

# Rebuild após mudanças
docker-compose up -d --build

# Limpar tudo (incluindo dados)
docker-compose down -v
```

### Serviços

- **backend**: Porta 3000
- **mongodb**: Porta 27017

## 🚀 Backend

API REST completa para gerenciamento de veículos (CRUD).

### Como executar

#### Com Docker (recomendado)
```bash
docker-compose up -d
```

#### Sem Docker
```bash
cd backend
npm install
npm run dev      # Modo desenvolvimento
npm test         # Executar testes
npm run build    # Build produção
npm start        # Executar produção
```

Documentação completa: [backend/README.md](backend/README.md)

## 📚 Documentação API

Acesse a documentação Swagger interativa em:
**http://localhost:3000/api-docs**

---

**Stack:** Node.js, Express, TypeScript, MongoDB, Docker, Swagger
