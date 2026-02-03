import { Vehicle, VehicleCreateInput, VehicleUpdateInput } from '../models/vehicle';
import { VehiclesRepository } from '../repositories/vehicles.repository';
import { VehicleValidator } from '../validators/vehicle.schema';
import { NotFoundError, ConflictError } from '../errors/http.error';

export class VehiclesService {
  constructor(private repository: VehiclesRepository) {}

  async create(data: VehicleCreateInput): Promise<Vehicle> {
    VehicleValidator.validateCreate(data);

    await this.checkDuplicates(data.placa, data.chassi, data.renavam);

    return this.repository.create(data);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Vehicle> {
    const vehicle = await this.repository.findById(id);
    
    if (!vehicle) {
      throw new NotFoundError('Veículo não encontrado');
    }

    return vehicle;
  }

  async update(id: string, data: VehicleUpdateInput): Promise<Vehicle> {
    VehicleValidator.validateUpdate(data);

    const existingVehicle = await this.repository.findById(id);
    if (!existingVehicle) {
      throw new NotFoundError('Veículo não encontrado');
    }

    await this.checkDuplicatesForUpdate(id, data);

    const updated = await this.repository.update(id, data);
    
    if (!updated) {
      throw new NotFoundError('Veículo não encontrado');
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    
    if (!deleted) {
      throw new NotFoundError('Veículo não encontrado');
    }
  }

  private async checkDuplicates(placa: string, chassi: string, renavam: string): Promise<void> {
    const errors: string[] = [];

    const existingPlaca = await this.repository.findByPlaca(placa);
    if (existingPlaca) {
      errors.push('Já existe um veículo com esta placa');
    }

    const existingChassi = await this.repository.findByChassi(chassi);
    if (existingChassi) {
      errors.push('Já existe um veículo com este chassi');
    }

    const existingRenavam = await this.repository.findByRenavam(renavam);
    if (existingRenavam) {
      errors.push('Já existe um veículo com este renavam');
    }

    if (errors.length > 0) {
      throw new ConflictError('Conflito de dados', errors);
    }
  }

  private async checkDuplicatesForUpdate(id: string, data: VehicleUpdateInput): Promise<void> {
    const errors: string[] = [];

    if (data.placa) {
      const existing = await this.repository.findByPlaca(data.placa);
      if (existing && existing.id !== id) {
        errors.push('Já existe um veículo com esta placa');
      }
    }

    if (data.chassi) {
      const existing = await this.repository.findByChassi(data.chassi);
      if (existing && existing.id !== id) {
        errors.push('Já existe um veículo com este chassi');
      }
    }

    if (data.renavam) {
      const existing = await this.repository.findByRenavam(data.renavam);
      if (existing && existing.id !== id) {
        errors.push('Já existe um veículo com este renavam');
      }
    }

    if (errors.length > 0) {
      throw new ConflictError('Conflito de dados', errors);
    }
  }
}
