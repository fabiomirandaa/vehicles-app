export interface Vehicle {
  id: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

export type VehicleCreateInput = Omit<Vehicle, 'id'>;
export type VehicleUpdateInput = Partial<VehicleCreateInput>;
