import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle extends Document {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

const VehicleSchema: Schema = new Schema(
  {
    placa: {
      type: String,
      required: [true, 'Placa é obrigatória'],
      trim: true,
      unique: true,
    },
    chassi: {
      type: String,
      required: [true, 'Chassi é obrigatório'],
      trim: true,
      unique: true,
    },
    renavam: {
      type: String,
      required: [true, 'Renavam é obrigatório'],
      trim: true,
      unique: true,
    },
    modelo: {
      type: String,
      required: [true, 'Modelo é obrigatório'],
      trim: true,
    },
    marca: {
      type: String,
      required: [true, 'Marca é obrigatória'],
      trim: true,
    },
    ano: {
      type: Number,
      required: [true, 'Ano é obrigatório'],
      min: [1886, 'Ano deve ser maior ou igual a 1886'],
      max: [new Date().getFullYear() + 1, `Ano deve ser menor ou igual a ${new Date().getFullYear() + 1}`],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc: any, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

export const VehicleModel = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
