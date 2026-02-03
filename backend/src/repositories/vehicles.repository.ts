import { VehicleModel, IVehicle } from '../models/vehicle.model';
import { Vehicle, VehicleCreateInput, VehicleUpdateInput } from '../models/vehicle';

export class VehiclesRepository {
  async findAll(): Promise<Vehicle[]> {
    const vehicles = await VehicleModel.find().lean();
    return vehicles.map(v => this.toVehicle(v));
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await VehicleModel.findById(id).lean();
    return vehicle ? this.toVehicle(vehicle) : null;
  }

  async findByPlaca(placa: string): Promise<Vehicle | null> {
    const vehicle = await VehicleModel.findOne({ placa }).lean();
    return vehicle ? this.toVehicle(vehicle) : null;
  }

  async findByChassi(chassi: string): Promise<Vehicle | null> {
    const vehicle = await VehicleModel.findOne({ chassi }).lean();
    return vehicle ? this.toVehicle(vehicle) : null;
  }

  async findByRenavam(renavam: string): Promise<Vehicle | null> {
    const vehicle = await VehicleModel.findOne({ renavam }).lean();
    return vehicle ? this.toVehicle(vehicle) : null;
  }

  async create(data: VehicleCreateInput): Promise<Vehicle> {
    const vehicle = await VehicleModel.create(data);
    return this.toVehicle(vehicle.toObject());
  }

  async update(id: string, updates: VehicleUpdateInput): Promise<Vehicle | null> {
    const vehicle = await VehicleModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();
    
    return vehicle ? this.toVehicle(vehicle) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await VehicleModel.findByIdAndDelete(id);
    return result !== null;
  }

  async clear(): Promise<void> {
    await VehicleModel.deleteMany({});
  }

  private toVehicle(doc: any): Vehicle {
    return {
      id: doc._id.toString(),
      placa: doc.placa,
      chassi: doc.chassi,
      renavam: doc.renavam,
      modelo: doc.modelo,
      marca: doc.marca,
      ano: doc.ano,
    };
  }
}
