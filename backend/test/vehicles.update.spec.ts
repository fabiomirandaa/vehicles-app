import { expect } from 'chai';
import request from 'supertest';
import path from 'path';
import { VehiclesRepository } from '../src/repositories/vehicles.repository';

process.env.NODE_ENV = 'test';

import app from '../src/server';

describe('Vehicles UPDATE', () => {
  const testFilePath = path.join(process.cwd(), 'data', 'vehicles-test.json');
  let repository: VehiclesRepository;

  beforeEach(async () => {
    repository = new VehiclesRepository(testFilePath);
    await repository.clear();
  });

  describe('PUT /vehicles/:id - Sucesso', () => {
    it('deve atualizar um veículo existente', async () => {
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

      const updateData = {
        modelo: 'Civic Touring',
        ano: 2024
      };

      const res = await request(app)
        .put(`/vehicles/${vehicleId}`)
        .send(updateData)
        .expect(200);

      expect(res.body.id).to.equal(vehicleId);
      expect(res.body.modelo).to.equal(updateData.modelo);
      expect(res.body.ano).to.equal(updateData.ano);
      expect(res.body.placa).to.equal(vehicleData.placa);
      expect(res.body.chassi).to.equal(vehicleData.chassi);
    });

    it('deve atualizar apenas os campos fornecidos', async () => {
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

      const updateData = {
        marca: 'Honda Premium'
      };

      const res = await request(app)
        .put(`/vehicles/${vehicleId}`)
        .send(updateData)
        .expect(200);

      expect(res.body.marca).to.equal(updateData.marca);
      expect(res.body.modelo).to.equal(vehicleData.modelo);
      expect(res.body.ano).to.equal(vehicleData.ano);
    });
  });

  describe('PUT /vehicles/:id - ID inexistente', () => {
    it('deve retornar erro 404 quando veículo não existir', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';

      const updateData = {
        modelo: 'Civic Touring'
      };

      const res = await request(app)
        .put(`/vehicles/${fakeId}`)
        .send(updateData)
        .expect(404);

      expect(res.body).to.have.property('message');
      expect(res.body.message).to.include('não encontrado');
    });
  });

  describe('PUT /vehicles/:id - Conflito de campos únicos', () => {
    it('deve retornar erro 409 ao atualizar placa para uma já existente', async () => {
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
      const createRes2 = await request(app).post('/vehicles').send(vehicle2);

      const vehicle2Id = createRes2.body.id;

      const updateData = {
        placa: 'ABC-1234' // Tentando usar a placa do vehicle1
      };

      const res = await request(app)
        .put(`/vehicles/${vehicle2Id}`)
        .send(updateData)
        .expect(409);

      expect(res.body.message).to.include('Conflito');
      expect(res.body.details).to.be.an('array');
      expect(res.body.details.some((d: string) => d.includes('placa'))).to.be.true;
    });

    it('deve retornar erro 409 ao atualizar chassi para um já existente', async () => {
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
      const createRes2 = await request(app).post('/vehicles').send(vehicle2);

      const vehicle2Id = createRes2.body.id;

      const updateData = {
        chassi: '9BWZZZ377VT004251'
      };

      const res = await request(app)
        .put(`/vehicles/${vehicle2Id}`)
        .send(updateData)
        .expect(409);

      expect(res.body.details.some((d: string) => d.includes('chassi'))).to.be.true;
    });

    it('deve retornar erro 409 ao atualizar renavam para um já existente', async () => {
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
      const createRes2 = await request(app).post('/vehicles').send(vehicle2);

      const vehicle2Id = createRes2.body.id;

      const updateData = {
        renavam: '12345678901'
      };

      const res = await request(app)
        .put(`/vehicles/${vehicle2Id}`)
        .send(updateData)
        .expect(409);

      expect(res.body.details.some((d: string) => d.includes('renavam'))).to.be.true;
    });

    it('deve permitir atualizar o mesmo veículo sem causar conflito consigo mesmo', async () => {
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

      const updateData = {
        placa: 'ABC-1234',
        modelo: 'Civic LX'
      };

      const res = await request(app)
        .put(`/vehicles/${vehicleId}`)
        .send(updateData)
        .expect(200);

      expect(res.body.modelo).to.equal(updateData.modelo);
      expect(res.body.placa).to.equal(updateData.placa);
    });
  });

  describe('PUT /vehicles/:id - Validação', () => {
    it('deve retornar erro 400 ao tentar atualizar com campos vazios', async () => {
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

      const updateData = {
        modelo: ''
      };

      const res = await request(app)
        .put(`/vehicles/${vehicleId}`)
        .send(updateData)
        .expect(400);

      expect(res.body.details).to.be.an('array');
    });

    it('deve retornar erro 400 ao atualizar ano com valor inválido', async () => {
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

      const updateData = {
        ano: 1800
      };

      const res = await request(app)
        .put(`/vehicles/${vehicleId}`)
        .send(updateData)
        .expect(400);

      expect(res.body.details).to.be.an('array');
    });
  });
});
