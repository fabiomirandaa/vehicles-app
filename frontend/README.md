# 🚗 Vehicles App - Frontend

Aplicação web moderna para gerenciamento de veículos construída com Angular 19, Material Design 3 e arquitetura baseada em Signals.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Build](#build)

## 🎯 Sobre o Projeto

Sistema completo de CRUD para gerenciamento de veículos com interface moderna, responsiva e seguindo as diretrizes do Material Design 3 Dark Theme.

### Funcionalidades

- ✅ Listagem de veículos com busca em tempo real
- ✅ Cadastro de novos veículos
- ✅ Edição de veículos existentes
- ✅ Exclusão de veículos com confirmação
- ✅ Validação de formulários com feedback visual
- ✅ Notificações toast para ações do usuário
- ✅ Design responsivo para mobile e desktop
- ✅ Tema dark com paleta vermelha/preta

## 🛠 Tecnologias

- **Angular 19.1.0** - Framework principal
- **Angular Material 19.1.0** - Componentes UI (Material Design 3)
- **TypeScript 5.7.2** - Linguagem de programação
- **RxJS 7.8.0** - Programação reativa
- **SCSS** - Pré-processador CSS com variáveis e mixins
- **Signals** - Sistema de reatividade do Angular
- **Standalone Components** - Arquitetura sem NgModules
- **ESLint + Prettier** - Qualidade de código

## 🏗 Arquitetura

### Padrão Arquitetural

O projeto segue uma **arquitetura simplificada baseada em features**, sem as camadas excessivas de Clean Architecture, utilizando as melhores práticas da comunidade Angular:

```
src/app/
├── core/                    # Módulo central da aplicação
│   ├── interceptors/        # HTTP interceptors
│   ├── services/            # Serviços globais (Toast, Error Handling)
│   └── models/              # Modelos de dados compartilhados
│
└── vehicles/                # Feature de veículos
    ├── components/          # Componentes da feature
    │   ├── vehicles-list/   # Listagem e busca
    │   └── vehicle-form/    # Formulário create/edit
    ├── services/            # Serviços da feature
    │   ├── vehicles.service.ts    # HTTP API
    │   └── vehicles.store.ts      # State management
    └── models/              # Interfaces e DTOs
```

### Gerenciamento de Estado

Utiliza **Signals** (nativo do Angular) para state management reativo:

```typescript
// vehicles.store.ts
vehicles = signal<Vehicle[]>([]);
loading = signal(false);
searchTerm = signal('');

// Computed signals
filteredVehicles = computed(() => {
  const term = this.searchTerm().toLowerCase();
  return this.vehicles().filter(v => /* filtro */);
});
```

### Estilização (SCSS)

Sistema de **Design Tokens** centralizado:

```scss
// _variables.scss
$color-background-primary: #121212;
$color-accent-primary: #dc2626;
$spacing-xl: 2rem;
$radius-pill: 28px;

// _mixins.scss
@mixin flex-center { /* ... */ }
@mixin card-elevated { /* ... */ }
```

## 📦 Pré-requisitos

- **Node.js** >= 20.x
- **npm** >= 10.x
- **Angular CLI** 19.x (instalado globalmente)

```bash
npm install -g @angular/cli@19
```

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd vehicles-app/frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie/edite `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 💻 Execução

### Desenvolvimento

```bash
npm start
# ou
ng serve
```

Acesse: **http://localhost:4200**

O servidor recarrega automaticamente ao detectar mudanças nos arquivos.

### Com Hot Module Replacement (HMR)

```bash
ng serve --hmr
```

### Modo de Produção (local)

```bash
ng serve --configuration production
```

## 📁 Estrutura de Pastas

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                     # Funcionalidades centrais
│   │   │   ├── interceptors/         # HTTP interceptors
│   │   │   │   ├── http-error.interceptor.ts
│   │   │   │   └── http-headers.interceptor.ts
│   │   │   ├── services/             # Serviços globais
│   │   │   │   ├── toast.service.ts
│   │   │   │   └── error-handling.service.ts
│   │   │   └── models/
│   │   │       └── error.model.ts
│   │   │
│   │   ├── vehicles/                 # Feature de veículos
│   │   │   ├── components/
│   │   │   │   ├── vehicles-list/
│   │   │   │   │   ├── vehicles-list.component.ts
│   │   │   │   │   ├── vehicles-list.component.html
│   │   │   │   │   └── vehicles-list.component.scss
│   │   │   │   └── vehicle-form/
│   │   │   │       ├── vehicle-form.component.ts
│   │   │   │       ├── vehicle-form.component.html
│   │   │   │       └── vehicle-form.component.scss
│   │   │   ├── services/
│   │   │   │   ├── vehicles.service.ts      # HTTP API client
│   │   │   │   └── vehicles.store.ts        # State management
│   │   │   └── models/
│   │   │       └── vehicle.model.ts
│   │   │
│   │   ├── app.component.ts          # Componente raiz
│   │   ├── app.config.ts             # Configuração da app
│   │   └── app.routes.ts             # Rotas da aplicação
│   │
│   ├── styles/                       # Estilos globais (SCSS)
│   │   ├── _variables.scss           # Design tokens
│   │   └── _mixins.scss              # Mixins reutilizáveis
│   │
│   ├── environments/                 # Ambientes
│   │   ├── environment.ts            # Desenvolvimento
│   │   └── environment.prod.ts       # Produção
│   │
│   ├── styles.scss                   # Estilos globais principais
│   ├── index.html                    # HTML principal
│   └── main.ts                       # Bootstrap da aplicação
│
├── angular.json                      # Configuração do Angular CLI
├── tsconfig.json                     # Configuração TypeScript
├── package.json                      # Dependências
└── README.md                         # Este arquivo
```

## 📝 Padrões de Código

### TypeScript/Angular

- **Standalone Components**: Todos os componentes são standalone (sem NgModules)
- **Signals**: Uso de signals para estado reativo
- **Injeção de Dependências**: Uso de `inject()` function-based
- **OnPush Change Detection**: Otimização de performance
- **Reactive Forms**: Validação e manipulação de formulários

### Convenções de Nomenclatura

```typescript
// Componentes
VehiclesListComponent       // PascalCase + Component suffix

// Serviços
VehiclesService            // PascalCase + Service suffix
VehiclesStore              // PascalCase + Store suffix

// Interfaces
Vehicle                    // PascalCase
VehicleCreateDto          // PascalCase + Dto suffix

// Variáveis/Funções
filteredVehicles          // camelCase
onDelete()                // camelCase + verbos para métodos
```

### SCSS

```scss
// Use variáveis ao invés de valores hard-coded
.button {
  background: $color-accent-primary;  // ✅ Correto
  padding: $spacing-md;               // ✅ Correto
  border-radius: $radius-pill;        // ✅ Correto
}

// Use mixins para padrões repetidos
.card {
  @include card-elevated;             // ✅ Correto
  @include hover-lift;                // ✅ Correto
}

// BEM naming para componentes
.vehicle-card {
  &__header { }
  &__body { }
  &--active { }
}
```

## 🧪 Testes

### Executar testes unitários

```bash
npm test
# ou
ng test
```

### Executar com coverage

```bash
ng test --code-coverage
```

O relatório de cobertura será gerado em `coverage/`.

### Executar testes E2E

```bash
ng e2e
```

## 🏭 Build

### Build de Produção

```bash
npm run build
# ou
ng build --configuration production
```

Os arquivos otimizados serão gerados em `dist/vehicles-app-frontend/`.

### Características do Build de Produção

- ✅ Minificação de código
- ✅ Tree-shaking
- ✅ AOT Compilation
- ✅ Otimização de bundles
- ✅ Source maps para debug

### Analisar tamanho do bundle

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/vehicles-app-frontend/stats.json
```

## 🎨 Tema e Estilização

### Design System

O projeto utiliza **Material Design 3** com tema **Dark** e paleta de cores personalizada:

- **Primária**: Vermelho (#dc2626, #b91c1c, #f87171)
- **Background**: Preto/Cinza (#121212, #1e1e1e, #2a2a2a)
- **Texto**: Branco (#ffffff, #e0e0e0)

### Customização

Para alterar o tema, edite `src/styles/_variables.scss`:

```scss
// Cores principais
$color-accent-primary: #dc2626;      // Vermelho principal
$color-background-primary: #121212;  // Fundo escuro

// Espaçamentos
$spacing-md: 1rem;

// Tipografia
$font-size-md: 1rem;
```

## 🔌 Integração com Backend

### Configuração da API

Edite `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // URL do backend
};
```

### Endpoints Utilizados

- `GET /vehicles` - Listar veículos
- `GET /vehicles/:id` - Buscar veículo por ID
- `POST /vehicles` - Criar veículo
- `PUT /vehicles/:id` - Atualizar veículo
- `DELETE /vehicles/:id` - Excluir veículo

## 🐛 Troubleshooting

### Erro: "Can't find stylesheet to import"

Execute:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de CORS

Certifique-se de que o backend está com CORS habilitado para `http://localhost:4200`.

### Hot Reload não funciona

Limpe o cache:
```bash
ng cache clean
ng serve
```

## 📚 Documentação Adicional

- [Angular Docs](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [RxJS](https://rxjs.dev)
- [TypeScript](https://www.typescriptlang.org)

## 👥 Contribuindo

1. Crie uma branch: `git checkout -b feature/nova-feature`
2. Faça commit: `git commit -m 'feat: adiciona nova feature'`
3. Push: `git push origin feature/nova-feature`
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
- [ ] Autenticação e cadastro
- [ ] Validação avançada de placa (Mercosul vs antiga)
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] PWA support
- [ ] E2E tests com Cypress/Playwright

## 📄 Licença

MIT

## 👨‍💻 Autor

Fábio Miranda
Vehicles App - Frontend com Angular 19
