# Vehicles API

API REST completa para gerenciamento de veículos (CRUD) construída com Node.js, Express, TypeScript, MongoDB e Docker.

## 🚀 Tecnologias

- **Node.js** com **Express**
- **TypeScript**
- **MongoDB** com **Mongoose**
- **Docker** e **Docker Compose**
- **Swagger** para documentação
- **Mocha** + **Chai** + **Supertest** para testes

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── swagger.ts
│   ├── controllers/
│   │   └── vehicles.controller.ts
│   ├── services/
│   │   └── vehicles.service.ts
│   ├── repositories/
│   │   └── vehicles.repository.ts
│   ├── routes/
│   │   └── vehicles.routes.ts
│   ├── models/
│   │   ├── vehicle.model.ts
│   │   └── vehicle.ts
│   ├── validators/
│   │   └── vehicle.schema.ts
│   ├── errors/
│   │   └── http.error.ts
│   └── server.ts
├── test/
│   ├── vehicles.create.spec.ts
│   ├── vehicles.read.spec.ts
│   ├── vehicles.update.spec.ts
│   └── vehicles.delete.spec.ts
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## 📋 Pré-requisitos

- Docker e Docker Compose (recomendado)
- Node.js 20 ou superior (apenas para desenvolvimento local sem Docker)

## 🐳 Executar com Docker (Recomendado)

A forma mais fácil de rodar a aplicação completa (backend + MongoDB):

```bash
# Na raiz do projeto (vehicles-app/)
docker-compose up -d
```

Isso irá:
- ✅ Subir container MongoDB na porta 27017
- ✅ Subir backend na porta 3000
- ✅ Criar volume persistente para o banco de dados

Acessar:
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api-docs

Comandos úteis:
```bash
# Ver logs
docker-compose logs -f backend

# Parar containers
docker-compose down

# Parar e remover volumes (limpa banco de dados)
docker-compose down -v

# Rebuild após mudanças no código
docker-compose up -d --build
```

## 🔧 Desenvolvimento Local (sem Docker)

### 1. Subir apenas o MongoDB com Docker
```bash
docker run -d \
  --name mongodb-vehicles \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo:7.0
```

### 2. Configurar variáveis de ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

### 3. Instalar dependências e rodar
```bash
npm install
npm run dev
```

## 📋 Pré-requisitos (desenvolvimento sem Docker)

- Node.js 20 ou superior
- npm ou yarn
- MongoDB rodando (via Docker ou local)

## 🧪 Executar Testes

```bash
# Rodar todos os testes
npm test

# Rodar testes em modo watch
npm run test:watch
```

## 📡 Endpoints da API

### 📚 Documentação Swagger

Acesse a documentação interativa completa da API:

**http://localhost:3000/api-docs**

A documentação Swagger permite:
- ✅ Visualizar todos os endpoints disponíveis
- ✅ Testar requisições diretamente no navegador
- ✅ Ver schemas de request/response
- ✅ Exemplos de uso para cada endpoint

### 1. Criar Veículo
**POST** `/vehicles`

**Body:**
```json
{
  "placa": "ABC-1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}
```

**Exemplo curl:**
```bash
curl -X POST http://localhost:3000/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "ABC-1234",
    "chassi": "9BWZZZ377VT004251",
    "renavam": "12345678901",
    "modelo": "Civic",
    "marca": "Honda",
    "ano": 2023
  }'
```

**Resposta (201 Created):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "placa": "ABC-1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}
```

---

### 2. Listar Todos os Veículos
**GET** `/vehicles`

**Exemplo curl:**
```bash
curl http://localhost:3000/vehicles
```

**Resposta (200 OK):**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "placa": "ABC-1234",
    "chassi": "9BWZZZ377VT004251",
    "renavam": "12345678901",
    "modelo": "Civic",
    "marca": "Honda",
    "ano": 2023
  },
  {
    "id": "987e6543-e21b-34d5-b678-987654321000",
    "placa": "XYZ-5678",
    "chassi": "9BWZZZ377VT004252",
    "renavam": "98765432109",
    "modelo": "Corolla",
    "marca": "Toyota",
    "ano": 2022
  }
]
```

---

### 3. Buscar Veículo por ID
**GET** `/vehicles/:id`

**Exemplo curl:**
```bash
curl http://localhost:3000/vehicles/123e4567-e89b-12d3-a456-426614174000
```

**Resposta (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "placa": "ABC-1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2023
}
```

**Resposta (404 Not Found):**
```json
{
  "message": "Veículo não encontrado"
}
```

---

### 4. Atualizar Veículo
**PUT** `/vehicles/:id`

**Body (campos opcionais):**
```json
{
  "modelo": "Civic Touring",
  "ano": 2024
}
```

**Exemplo curl:**
```bash
curl -X PUT http://localhost:3000/vehicles/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "modelo": "Civic Touring",
    "ano": 2024
  }'
```

**Resposta (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "placa": "ABC-1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Civic Touring",
  "marca": "Honda",
  "ano": 2024
}
```

---

### 5. Deletar Veículo
**DELETE** `/vehicles/:id`

**Exemplo curl:**
```bash
curl -X DELETE http://localhost:3000/vehicles/123e4567-e89b-12d3-a456-426614174000
```

**Resposta (204 No Content):**
_(Sem corpo de resposta)_

**Resposta (404 Not Found):**
```json
{
  "message": "Veículo não encontrado"
}
```

---

## ⚠️ Respostas de Erro

### Erro de Validação (400 Bad Request)
```json
{
  "message": "Erro de validação",
  "details": [
    "placa é obrigatória e não pode ser vazia",
    "ano deve estar entre 1886 e 2027"
  ]
}
```

### Conflito de Duplicidade (409 Conflict)
```json
{
  "message": "Conflito de dados",
  "details": [
    "Já existe um veículo com esta placa"
  ]
}
```

### Não Encontrado (404 Not Found)
```json
{
  "message": "Veículo não encontrado"
}
```

---

## ✅ Regras de Validação

- **placa**, **chassi**, **renavam**, **modelo**, **marca**: obrigatórios e não podem ser vazios
- **ano**: obrigatório, número inteiro entre 1886 e (ano atual + 1)
- **placa**, **chassi**, **renavam**: devem ser únicos no sistema

---

## 🧪 Cobertura de Testes

Os testes cobrem todos os cenários principais:

### Create (POST)
- ✅ Criação com sucesso
- ✅ Falhas de validação (campos vazios, ano inválido, etc.)
- ✅ Conflitos de duplicidade (placa, chassi, renavam)

### Read (GET)
- ✅ Listar todos os veículos
- ✅ Buscar por ID existente
- ✅ Buscar por ID inexistente (404)

### Update (PUT)
- ✅ Atualização com sucesso
- ✅ ID inexistente (404)
- ✅ Conflitos de campos únicos
- ✅ Validações de campos

### Delete (DELETE)
- ✅ Deleção com sucesso (204)
- ✅ ID inexistente (404)
- ✅ Múltiplas deleções

---

## 🏗️ Arquitetura

A aplicação segue uma arquitetura em camadas limpa:

- **Controller**: Lida apenas com HTTP (request/response)
- **Service**: Contém regras de negócio e validações
- **Repository**: Gerencia persistência no MongoDB com Mongoose
- **Models**: Define tipos TypeScript e schemas Mongoose
- **Validators**: Validação de dados com Zod
- **Errors**: Classes de erro customizadas

---

## 💾 Persistência

Os dados são armazenados no **MongoDB**. Ao usar Docker Compose, um volume persistente é criado automaticamente, garantindo que os dados não sejam perdidos quando os containers são parados.

**Credenciais padrão:**
- Username: `admin`
- Password: `admin123`
- Database: `vehicles_db`

---

## 🔒 Segurança

- Validação rigorosa de entrada
- Tratamento de erros centralizado
- Prevenção de corrupção de dados em operações concorrentes

---

## 📝 Licença

ISC

---

## 👨‍💻 Desenvolvimento

Desenvolvido seguindo as melhores práticas de Clean Code, SOLID e arquitetura em camadas.
