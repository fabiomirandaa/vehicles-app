import { Router } from 'express';
import { VehiclesController } from '../controllers/vehicles.controller';
import { VehiclesService } from '../services/vehicles.service';
import { VehiclesRepository } from '../repositories/vehicles.repository';

const router = Router();

// Instanciar dependências
const repository = new VehiclesRepository();
const service = new VehiclesService(repository);
const controller = new VehiclesController(service);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     tags: [Vehicles]
 *     summary: Criar um novo veículo
 *     description: Cadastra um novo veículo no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleInput'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.post('/vehicles', controller.create);

/**
 * @swagger
 * /vehicles:
 *   get:
 *     tags: [Vehicles]
 *     summary: Listar todos os veículos
 *     description: Retorna uma lista com todos os veículos cadastrados
 *     responses:
 *       200:
 *         description: Lista de veículos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
router.get('/vehicles', controller.findAll);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     tags: [Vehicles]
 *     summary: Buscar veículo por ID
 *     description: Retorna os dados de um veículo específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do veículo
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/vehicles/:id', controller.findById);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     tags: [Vehicles]
 *     summary: Atualizar veículo
 *     description: Atualiza os dados de um veículo existente (atualização parcial permitida)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do veículo
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleUpdate'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.put('/vehicles/:id', controller.update);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     tags: [Vehicles]
 *     summary: Deletar veículo
 *     description: Remove um veículo do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do veículo
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       204:
 *         description: Veículo deletado com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/vehicles/:id', controller.delete);

export default router;
