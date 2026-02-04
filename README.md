# 🚗 Vehicles App - Fullstack

Sistema completo de gerenciamento de veículos com backend Node.js + Express + MongoDB e frontend Angular 19.

## 🚀 Quick Start

### Opção 1: Com Docker (apenas backend)

```bash
# Subir backend + MongoDB
docker-compose up -d

# Em outro terminal, rodar o frontend
cd frontend
npm install
npm start

# Acessar
# Frontend: http://localhost:4200
# API: http://localhost:3000
# Swagger: http://localhost:3000/api-docs
```

### Opção 2: Tudo local (sem Docker)

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm start

# Acessar
# Frontend: http://localhost:4200
# API: http://localhost:3000
```

## 📁 Estrutura do Projeto

```
vehicles-app/
├── docker-compose.yml    # Orquestração de containers
├── backend/              # API REST Node.js + Express + TypeScript + MongoDB
│   ├── Dockerfile
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── README.md
└── frontend/             # SPA Angular 19 + Material Design 3
    ├── src/
    │   ├── app/
    │   ├── styles/
    │   └── environments/
    ├── angular.json
    ├── package.json
    └── README.md
```

## 🛠️ Tecnologias

### Backend
- **Node.js 20** + **Express 4**
- **TypeScript 5.3**
- **MongoDB 7.0** + **Mongoose 8**
- **Zod** (validação de schemas)
- **Docker** + **Docker Compose**
- **Swagger** (documentação interativa)
- **Mocha** + **Chai** + **Supertest** (testes)

### Frontend
- **Angular 19.1** (Standalone Components)
- **Angular Material 19** (Material Design 3)
- **TypeScript 5.7**
- **RxJS 7.8** (Programação Reativa)
- **Signals** (State Management)
- **SCSS** (Design System com variáveis e mixins)
- **Jasmine** + **Karma** (testes)

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

### Documentação API

Acesse a documentação Swagger interativa em:
**http://localhost:3000/api-docs**

### Endpoints principais

- `GET /api/vehicles` - Listar todos os veículos
- `GET /api/vehicles/:id` - Buscar veículo por ID
- `POST /api/vehicles` - Criar novo veículo
- `PUT /api/vehicles/:id` - Atualizar veículo
- `DELETE /api/vehicles/:id` - Excluir veículo

**Documentação completa:** [backend/README.md](backend/README.md)

## 💻 Frontend

SPA (Single Page Application) em Angular 19 com Material Design 3.

### Como executar

#### Pré-requisitos
```bash
# Instalar Angular CLI globalmente (opcional)
npm install -g @angular/cli@19
```

#### Desenvolvimento
```bash
cd frontend
npm install
npm start        # Servidor dev em http://localhost:4200
```

#### Build
```bash
npm run build    # Build de produção
npm test         # Executar testes
npm run lint     # Verificar código
```

### Funcionalidades

- ✅ Listagem de veículos com busca em tempo real
- ✅ Cadastro de novos veículos
- ✅ Edição de veículos existentes
- ✅ Exclusão com confirmação
- ✅ Validação de formulários
- ✅ Tema dark Material Design 3 (preto/vermelho)
- ✅ Design responsivo (mobile/desktop)
- ✅ Notificações toast

**Documentação completa:** [frontend/README.md](frontend/README.md)

## 🔄 Fluxo Completo da Aplicação

1. **Backend** (porta 3000) fornece API REST
2. **MongoDB** (porta 27017) armazena os dados
3. **Frontend** (porta 4200) consome a API e exibe a interface

### Ordem de execução recomendada

```bash
# 1. Subir backend + MongoDB
docker-compose up -d

# 2. Aguardar backend estar pronto (check: http://localhost:3000/health)

# 3. Subir frontend
cd frontend
npm start

# 4. Acessar aplicação em http://localhost:4200
```

## 🧪 Testes

### Backend
```bash
cd backend
npm test                    # Todos os testes
npm run test:coverage       # Com coverage
```

### Frontend
```bash
cd frontend
npm test                    # Testes unitários
npm run test:coverage       # Com coverage
```

## 📦 Variáveis de Ambiente

### Backend (`backend/.env`)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vehicles-db
NODE_ENV=development
```

### Frontend (`frontend/src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 🐛 Troubleshooting

### Backend não conecta no MongoDB
```bash
# Verificar se MongoDB está rodando
docker-compose ps

# Ver logs do MongoDB
docker-compose logs mongodb

# Reiniciar containers
docker-compose restart
```

### Frontend não conecta na API (CORS)
- Verifique se o backend está rodando em `http://localhost:3000`
- Confirme que CORS está habilitado no backend para `http://localhost:4200`

### Erro de compilação SCSS no frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentação Adicional

- **Backend**: [backend/README.md](backend/README.md) - Arquitetura, testes, deployment
- **Frontend**: [frontend/README.md](frontend/README.md) - Componentes, SCSS, padrões
- **API Swagger**: http://localhost:3000/api-docs

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'feat: adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

MIT

---

**Stack:** Node.js, Express, MongoDB, Angular, Material Design, TypeScript, Docker
