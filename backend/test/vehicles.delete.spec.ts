import { expect } from 'chai';
import request from 'supertest';
import path from 'path';
import { VehiclesRepository } from '../src/repositories/vehicles.repository';

process.env.NODE_ENV = 'test';

import app from '../src/server';

describe('Vehicles DELETE', () => {
  const testFilePath = path.join(process.cwd(), 'data', 'vehicles-test.json');
  let repository: VehiclesRepository;

  beforeEach(async () => {
    repository = new VehiclesRepository(testFilePath);
    await repository.clear();
  });

  describe('DELETE /vehicles/:id - Sucesso', () => {
    it('deve deletar um veículo existente e retornar 204', async () => {
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
        .delete(`/vehicles/${vehicleId}`)
        .expect(204);

      expect(res.body).to.be.empty;

      await request(app)
        .get(`/vehicles/${vehicleId}`)
        .expect(404);
    });

    it('deve deletar um veículo e manter os outros', async () => {
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

      const createRes1 = await request(app).post('/vehicles').send(vehicle1);
      await request(app).post('/vehicles').send(vehicle2);

      const vehicle1Id = createRes1.body.id;

      await request(app)
        .delete(`/vehicles/${vehicle1Id}`)
        .expect(204);

      const listRes = await request(app)
        .get('/vehicles')
        .expect(200);

      expect(listRes.body).to.have.lengthOf(1);
      expect(listRes.body[0].placa).to.equal(vehicle2.placa);
    });
  });

  describe('DELETE /vehicles/:id - Veículo inexistente', () => {
    it('deve retornar erro 404 ao tentar deletar veículo inexistente', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';

      const res = await request(app)
        .delete(`/vehicles/${fakeId}`)
        .expect(404);

      expect(res.body).to.have.property('message');
      expect(res.body.message).to.include('não encontrado');
    });

    it('deve retornar erro 404 para ID inválido', async () => {
      const res = await request(app)
        .delete('/vehicles/invalid-id')
        .expect(404);

      expect(res.body).to.have.property('message');
    });
  });

  describe('DELETE /vehicles/:id - Cenários múltiplos', () => {
    it('deve permitir deletar todos os veículos', async () => {
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

      const createRes1 = await request(app).post('/vehicles').send(vehicle1);
      const createRes2 = await request(app).post('/vehicles').send(vehicle2);

      await request(app).delete(`/vehicles/${createRes1.body.id}`).expect(204);
      await request(app).delete(`/vehicles/${createRes2.body.id}`).expect(204);

      const listRes = await request(app)
        .get('/vehicles')
        .expect(200);

      expect(listRes.body).to.have.lengthOf(0);
    });

    it('não deve permitir deletar o mesmo veículo duas vezes', async () => {
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

      await request(app).delete(`/vehicles/${vehicleId}`).expect(204);
      await request(app).delete(`/vehicles/${vehicleId}`).expect(404);
    });
  });
});
