import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicles API',
      version: '1.0.0',
      description: 'API REST completa para gerenciamento de veículos (CRUD)',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    tags: [
      {
        name: 'Vehicles',
        description: 'Operações de CRUD de veículos',
      },
    ],
    components: {
      schemas: {
        Vehicle: {
          type: 'object',
          required: ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do veículo (gerado automaticamente)',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            placa: {
              type: 'string',
              description: 'Placa do veículo (única)',
              example: 'ABC-1234',
            },
            chassi: {
              type: 'string',
              description: 'Número do chassi (único)',
              example: '9BWZZZ377VT004251',
            },
            renavam: {
              type: 'string',
              description: 'Número do RENAVAM (único)',
              example: '12345678901',
            },
            modelo: {
              type: 'string',
              description: 'Modelo do veículo',
              example: 'Civic',
            },
            marca: {
              type: 'string',
              description: 'Marca do veículo',
              example: 'Honda',
            },
            ano: {
              type: 'integer',
              description: 'Ano do veículo (entre 1886 e ano atual + 1)',
              example: 2023,
              minimum: 1886,
              maximum: 2027,
            },
          },
        },
        VehicleInput: {
          type: 'object',
          required: ['placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano'],
          properties: {
            placa: {
              type: 'string',
              description: 'Placa do veículo',
              example: 'ABC-1234',
            },
            chassi: {
              type: 'string',
              description: 'Número do chassi',
              example: '9BWZZZ377VT004251',
            },
            renavam: {
              type: 'string',
              description: 'Número do RENAVAM',
              example: '12345678901',
            },
            modelo: {
              type: 'string',
              description: 'Modelo do veículo',
              example: 'Civic',
            },
            marca: {
              type: 'string',
              description: 'Marca do veículo',
              example: 'Honda',
            },
            ano: {
              type: 'integer',
              description: 'Ano do veículo',
              example: 2023,
            },
          },
        },
        VehicleUpdate: {
          type: 'object',
          properties: {
            placa: {
              type: 'string',
              example: 'ABC-1234',
            },
            chassi: {
              type: 'string',
              example: '9BWZZZ377VT004251',
            },
            renavam: {
              type: 'string',
              example: '12345678901',
            },
            modelo: {
              type: 'string',
              example: 'Civic Touring',
            },
            marca: {
              type: 'string',
              example: 'Honda',
            },
            ano: {
              type: 'integer',
              example: 2024,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Erro de validação',
            },
            details: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Detalhes adicionais do erro',
              example: ['placa é obrigatória e não pode ser vazia'],
            },
          },
        },
      },
      responses: {
        ValidationError: {
          description: 'Erro de validação',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Erro de validação',
                details: ['placa é obrigatória e não pode ser vazia', 'ano deve estar entre 1886 e 2027'],
              },
            },
          },
        },
        ConflictError: {
          description: 'Conflito de dados (duplicidade)',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Conflito de dados',
                details: ['Já existe um veículo com esta placa'],
              },
            },
          },
        },
        NotFoundError: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Veículo não encontrado',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
