# Vehicles App - Frontend

Aplicação Angular 19 para gerenciamento de veículos, consumindo API REST com arquitetura moderna, standalone components, signals para state management e boas práticas de desenvolvimento.

## 🚀 Tecnologias

- **Angular 19** - Framework principal
- **TypeScript 5.7** - Tipagem forte
- **Angular Material 19** - Componentes UI
- **Signals** - State management moderno
- **Reactive Forms** - Formulários reativos com validação
- **RxJS 7.8** - Programação reativa
- **Jasmine/Karma** - Testes unitários
- **ESLint + Prettier** - Linting e formatação

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                       # Infraestrutura global
│   │   ├── interceptors/           # HTTP interceptors
│   │   │   ├── http-error.interceptor.ts
│   │   │   ├── http-headers.interceptor.ts
│   │   │   └── skip-error-toast.token.ts
│   │   ├── models/                 # Models globais
│   │   │   └── error.model.ts
│   │   └── services/               # Serviços globais
│   │       ├── error-handling.service.ts
│   │       └── toast.service.ts
│   │
│   ├── features/                   # Features do app
│   │   └── vehicles/               # Feature de veículos
│   │       ├── data-access/        # Camada de dados
│   │       │   ├── vehicles-api.service.ts
│   │       │   ├── vehicles-api.service.spec.ts
│   │       │   ├── vehicles.store.ts
│   │       │   └── vehicles.store.spec.ts
│   │       ├── models/             # Tipos e interfaces
│   │       │   └── vehicle.model.ts
│   │       ├── pages/              # Páginas (rotas)
│   │       │   ├── vehicle-create/
│   │       │   ├── vehicle-edit/
│   │       │   └── vehicles-list/
│   │       ├── ui/                 # Componentes UI
│   │       │   ├── vehicle-form/
│   │       │   └── vehicles-table/
│   │       └── vehicles.routes.ts
│   │
│   ├── shared/                     # Componentes compartilhados
│   │   └── components/
│   │       └── confirm-dialog/
│   │
│   ├── app.component.ts            # Root component
│   ├── app.config.ts               # Configuração do app
│   └── app.routes.ts               # Rotas principais
│
├── environments/                   # Ambientes
│   ├── environment.ts
│   └── environment.prod.ts
│
└── styles.scss                     # Estilos globais
```

## 🏗️ Arquitetura

### Standalone Components
- Sem NgModules, usando `bootstrapApplication`
- Componentes standalone em toda aplicação
- Lazy loading por feature

### State Management
- **Signals** para estado reativo
- VehiclesStore com:
  - `vehicles` - Lista de veículos
  - `loading` - Estado de carregamento
  - `error` - Erro atual
  - `filter` - Filtro de busca
  - `filteredVehicles` - Computed signal
  - `hasVehicles`, `isEmpty` - Computed helpers

### Camadas
1. **Core**: Interceptors, error handling, services globais
2. **Features**: Domínios da aplicação (vehicles)
   - **data-access**: Services, stores, queries
   - **ui**: Componentes UI puros
   - **pages**: Componentes de rota
   - **models**: Tipos e interfaces
3. **Shared**: Componentes reutilizáveis

### HTTP & Error Handling
- Interceptors para headers e tratamento de erros
- Normalização de erros HTTP
- Toast service para feedback
- `SKIP_ERROR_TOAST` token para pular toasts específicos

## 🔧 Configuração

### Pré-requisitos
- Node.js 20+
- npm ou yarn

### Instalação

```bash
cd frontend
npm install
```

### Configurar Environment

Edite `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000', // URL da API backend
};
```

Para produção, edite `src/environments/environment.prod.ts`.

## 🚀 Executando

### Desenvolvimento

```bash
npm start
```

Aplicação disponível em `http://localhost:4200`

### Build

```bash
# Desenvolvimento
npm run build

# Produção
npm run build -- --configuration production
```

### Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage
```

### Lint

```bash
npm run lint
```

## 🎯 Funcionalidades

### Listagem de Veículos
- Tabela responsiva com todos os veículos
- Busca/filtro em tempo real por:
  - Placa
  - Marca
  - Modelo
  - Chassi
  - Renavam
- Loading states e skeleton
- Empty states
- Ações de editar e excluir

### Criar Veículo
- Formulário reativo com validações:
  - **Placa**: 7-8 caracteres (suporta Mercosul)
  - **Chassi**: 17 caracteres obrigatórios
  - **Renavam**: 11 dígitos obrigatórios
  - **Modelo/Marca**: obrigatórios, mínimo 1 caractere
  - **Ano**: entre 1886 e ano atual + 1
- Transformação automática (uppercase para placa/chassi)
- Feedback de erro com mensagens acessíveis
- Toast de sucesso/erro

### Editar Veículo
- Carrega dados do veículo por ID
- Loading skeleton durante carregamento
- Mesmo formulário do create, reutilizado
- Guard: navega para list se veículo não for encontrado
- Atualiza lista sem reload

### Excluir Veículo
- Dialog de confirmação acessível
- Exclusão otimista (remove da lista antes da API)
- Rollback automático se der erro
- Toast de feedback

## 🎨 UI/UX

### Acessibilidade
- ARIA labels em todos os inputs
- `aria-invalid` e `aria-describedby` para erros
- Navegação por teclado
- Foco correto ao abrir modals
- Dialog com `cdkFocusInitial`

### Performance
- `OnPush` change detection em todos os componentes
- `trackBy` nas listas
- Computed signals para derivações
- Lazy loading de features
- HTTP interceptors otimizados

### Estados
- **Loading**: Spinners e skeleton screens
- **Empty**: Mensagens amigáveis e ações
- **Error**: Mensagens claras com detalhes
- **Success**: Toasts de confirmação

## 🧪 Testes

### Cobertura
- **VehiclesApiService**: Mock HTTP calls
- **VehiclesStore**: States, actions, errors
- **VehicleFormComponent**: Validações, submit, transformações

### Executar

```bash
# Rodar testes
npm test

# Com coverage
npm run test:coverage

# Ver relatório
open coverage/vehicles-app-frontend/index.html
```

## 🛠️ Desenvolvimento

### Path Aliases

Configurado no `tsconfig.json`:

```typescript
import { ... } from '@core/...';
import { ... } from '@shared/...';
import { ... } from '@features/...';
import { ... } from '@environments/...';
```

### Criar Novo Componente

```bash
ng generate component features/vehicles/ui/new-component --standalone --change-detection=OnPush
```

### Criar Novo Service

```bash
ng generate service features/vehicles/data-access/new-service
```

## 🔌 Integração com Backend

A aplicação consome a API REST do backend:

- **GET** `/vehicles` - Listar todos
- **GET** `/vehicles/:id` - Buscar por ID
- **POST** `/vehicles` - Criar
- **PUT** `/vehicles/:id` - Atualizar
- **DELETE** `/vehicles/:id` - Excluir

Certifique-se de que o backend está rodando em `http://localhost:3000` (ou ajuste no environment).

## 📝 Boas Práticas Implementadas

✅ Standalone APIs sem NgModules  
✅ Signals para state management  
✅ Reactive Forms com validações completas  
✅ OnPush change detection  
✅ TrackBy em listas  
✅ HTTP interceptors  
✅ Error handling centralizado  
✅ Toast service para feedback  
✅ Lazy loading por feature  
✅ Acessibilidade (ARIA)  
✅ Testes unitários  
✅ ESLint + Prettier  
✅ TypeScript strict mode  
✅ Path aliases  

## 🎯 Próximos Passos (Extras)

- [ ] Paginação client-side
- [ ] Ordenação por coluna
- [ ] Máscaras de input (placa, chassi)
- [ ] Validação avançada de placa (Mercosul vs antiga)
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] PWA support
- [ ] E2E tests com Cypress/Playwright

## 📄 Licença

MIT

## 👨‍💻 Autor

Vehicles App - Frontend com Angular 19
