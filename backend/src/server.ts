import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { connectDatabase } from './config/database';
import vehiclesRoutes from './routes/vehicles.routes';
import { HttpError } from './errors/http.error';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Accept'],
}));
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Vehicles API Documentation',
}));

// Rota raiz com informações sobre a API
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Vehicles API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      vehicles: '/vehicles',
    },
  });
});

// Rotas
app.use(vehiclesRoutes);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Tratar CastError do Mongoose (ID inválido)
  if (err.name === 'CastError') {
    return res.status(404).json({
      message: 'Recurso não encontrado'
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }

  console.error('Erro não tratado:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Conectar ao banco de dados
    if (process.env.NODE_ENV !== 'test') {
      await connectDatabase();
    }

    // Iniciar servidor apenas se não estiver em ambiente de teste
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📚 Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
      });
    }
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
