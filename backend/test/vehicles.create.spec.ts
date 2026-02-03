import { expect } from 'chai';
import request from 'supertest';
import path from 'path';
import { VehiclesRepository } from '../src/repositories/vehicles.repository';

process.env.NODE_ENV = 'test';

import app from '../src/server';

describe('Vehicles CREATE', () => {
  const testFilePath = path.join(process.cwd(), 'data', 'vehicles-test.json');
  let repository: VehiclesRepository;

  beforeEach(async () => {
    repository = new VehiclesRepository(testFilePath);
    await repository.clear();
  });

  describe('POST /vehicles - Sucesso', () => {
    it('deve criar um veículo com dados válidos', async () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023
      };

      const res = await request(app)
        .post('/vehicles')
        .send(vehicleData)
        .expect(201);

      expect(res.body).to.have.property('id');
      expect(res.body.placa).to.equal(vehicleData.placa);
      expect(res.body.chassi).to.equal(vehicleData.chassi);
      expect(res.body.renavam).to.equal(vehicleData.renavam);
      expect(res.body.modelo).to.equal(vehicleData.modelo);
      expect(res.body.marca).to.equal(vehicleData.marca);
      expect(res.body.ano).to.equal(vehicleData.ano);
    });
  });

  describe('POST /vehicles - Falha de validação', () => {
    it('deve retornar erro 400 quando placa estiver vazia', async () => {
      const vehicleData = {
        placa: '',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023
      };

      const res = await request(app)
        .post('/vehicles')
        .send(vehicleData)
        .expect(400);

      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('details');
      expect(res.body.details).to.be.an('array');
    });

    it('deve retornar erro 400 quando chassi não for fornecido', async () => {
      const vehicleData = {
        placa: 'ABC-1234',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023
      };

      const res = await request(app)
        .post('/vehicles')
        .send(vehicleData)
        .expect(400);

      expect(res.body.message).to.include('validação');
    });

    it('deve retornar erro 400 quando ano for inválido (menor que 1886)', async () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 1885
      };

      const res = await request(app)
        .post('/vehicles')
        .send(vehicleData)
        .expect(400);

      expect(res.body.details).to.be.an('array');
      expect(res.body.details.some((d: string) => d.includes('1886'))).to.be.true;
    });

    it('deve retornar erro 400 quando ano for maior que ano atual + 1', async () => {
      const currentYear = new Date().getFullYear();
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: currentYear + 2
      };

      const res = await request(app)
        .post('/vehicles')
        .send(vehicleData)
        .expect(400);

      expect(res.body.details).to.be.an('array');
    });

    it('deve retornar erro 400 quando ano não for um inteiro', async () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023.5
      };

      const res = await request(app)
        .post('/vehicles')
        .send(vehicleData)
        .expect(400);

      expect(res.body.details).to.be.an('array');
      expect(res.body.details.some((d: string) => d.includes('inteiro'))).to.be.true;
    });

    it('deve retornar erro 400 quando múltiplos campos estiverem inválidos', async () => {
      const vehicleData = {
        placa: '',
        chassi: '',
        renavam: '',
        modelo: '',
        marca: '',
        ano: 'invalid' as any
      };

      const res = await request(app)
        .post('/vehicles')
        .send(vehicleData)
        .expect(400);

      expect(res.body.details).to.be.an('array');
      expect(res.body.details.length).to.be.greaterThan(1);
    });
  });

  describe('POST /vehicles - Falha de duplicidade', () => {
    beforeEach(async () => {
      await repository.clear();
    });

    it('deve retornar erro 409 quando placa já existir', async () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023
      };

      await request(app).post('/vehicles').send(vehicleData).expect(201);

      const duplicateData = {
        ...vehicleData,
        chassi: 'DIFFERENT123456789',
        renavam: '98765432109'
      };

      const res = await request(app)
        .post('/vehicles')
        .send(duplicateData)
        .expect(409);

      expect(res.body.message).to.include('Conflito');
      expect(res.body.details).to.be.an('array');
      expect(res.body.details.some((d: string) => d.includes('placa'))).to.be.true;
    });

    it('deve retornar erro 409 quando chassi já existir', async () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023
      };

      await request(app).post('/vehicles').send(vehicleData).expect(201);

      const duplicateData = {
        ...vehicleData,
        placa: 'XYZ-9999',
        renavam: '98765432109'
      };

      const res = await request(app)
        .post('/vehicles')
        .send(duplicateData)
        .expect(409);

      expect(res.body.details.some((d: string) => d.includes('chassi'))).to.be.true;
    });

    it('deve retornar erro 409 quando renavam já existir', async () => {
      const vehicleData = {
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2023
      };

      await request(app).post('/vehicles').send(vehicleData).expect(201);

      const duplicateData = {
        ...vehicleData,
        placa: 'XYZ-9999',
        chassi: 'DIFFERENT123456789'
      };

      const res = await request(app)
        .post('/vehicles')
        .send(duplicateData)
        .expect(409);

      expect(res.body.details.some((d: string) => d.includes('renavam'))).to.be.true;
    });
  });
});
