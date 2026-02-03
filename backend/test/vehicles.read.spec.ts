import { expect } from 'chai';
import request from 'supertest';
import path from 'path';
import { VehiclesRepository } from '../src/repositories/vehicles.repository';

process.env.NODE_ENV = 'test';

import app from '../src/server';

describe('Vehicles READ', () => {
  const testFilePath = path.join(process.cwd(), 'data', 'vehicles-test.json');
  let repository: VehiclesRepository;

  beforeEach(async () => {
    repository = new VehiclesRepository(testFilePath);
    await repository.clear();
  });

  describe('GET /vehicles - Listar todos', () => {
    it('deve retornar lista vazia quando não houver veículos', async () => {
      const res = await request(app)
        .get('/vehicles')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(0);
    });

    it('deve retornar todos os veículos cadastrados', async () => {
      const vehicle1 = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023
      };

      const vehicle2 = {
        placa: 'XYZ-5678',
        chassi: '9BWZZZ377VT004252',
        renavam: '98765432109',
        modelo: 'Corolla',
        marca: 'Toyota',
        ano: 2022
      };

      await request(app).post('/vehicles').send(vehicle1);
      await request(app).post('/vehicles').send(vehicle2);

      const res = await request(app)
        .get('/vehicles')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[1]).to.have.property('id');
    });
  });

  describe('GET /vehicles/:id - Buscar por ID', () => {
    it('deve retornar um veículo específico pelo ID', async () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023
      };

      const createRes = await request(app)
        .post('/vehicles')
        .send(vehicleData);

      const vehicleId = createRes.body.id;

      const res = await request(app)
        .get(`/vehicles/${vehicleId}`)
        .expect(200);

      expect(res.body).to.have.property('id', vehicleId);
      expect(res.body.placa).to.equal(vehicleData.placa);
      expect(res.body.chassi).to.equal(vehicleData.chassi);
      expect(res.body.modelo).to.equal(vehicleData.modelo);
    });

    it('deve retornar erro 404 quando veículo não existir', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';

      const res = await request(app)
        .get(`/vehicles/${fakeId}`)
        .expect(404);

      expect(res.body).to.have.property('message');
      expect(res.body.message).to.include('não encontrado');
    });

    it('deve retornar erro 404 para ID inválido', async () => {
      const res = await request(app)
        .get('/vehicles/invalid-id')
        .expect(404);

      expect(res.body).to.have.property('message');
    });
  });
});
