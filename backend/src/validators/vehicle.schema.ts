import { z } from 'zod';
import { VehicleCreateInput, VehicleUpdateInput } from '../models/vehicle';
import { ValidationError } from '../errors/http.error';

const currentYear = new Date().getFullYear();

export const vehicleCreateSchema = z.object({
  placa: z.string({
    required_error: 'placa é obrigatória',
    invalid_type_error: 'placa deve ser uma string'
  }).trim().min(1, 'placa não pode ser vazia'),

  chassi: z.string({
    required_error: 'chassi é obrigatório',
    invalid_type_error: 'chassi deve ser uma string'
  }).trim().min(1, 'chassi não pode ser vazio'),

  renavam: z.string({
    required_error: 'renavam é obrigatório',
    invalid_type_error: 'renavam deve ser uma string'
  }).trim().min(1, 'renavam não pode ser vazio'),

  modelo: z.string({
    required_error: 'modelo é obrigatório',
    invalid_type_error: 'modelo deve ser uma string'
  }).trim().min(1, 'modelo não pode ser vazio'),

  marca: z.string({
    required_error: 'marca é obrigatória',
    invalid_type_error: 'marca deve ser uma string'
  }).trim().min(1, 'marca não pode ser vazia'),

  ano: z.number({
    required_error: 'ano é obrigatório',
    invalid_type_error: 'ano deve ser um número'
  })
    .int('ano deve ser um número inteiro')
    .min(1886, 'ano deve ser maior ou igual a 1886')
    .max(currentYear + 1, `ano deve ser menor ou igual a ${currentYear + 1}`)
});

export const vehicleUpdateSchema = vehicleCreateSchema.partial();

export type VehicleCreateData = z.infer<typeof vehicleCreateSchema>;
export type VehicleUpdateData = z.infer<typeof vehicleUpdateSchema>;

export class VehicleValidator {
  static validateCreate(data: any): asserts data is VehicleCreateInput {
    try {
      vehicleCreateSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => err.message);
        throw new ValidationError('Erro de validação', errors);
      }
      throw error;
    }
  }

  static validateUpdate(data: any): asserts data is VehicleUpdateInput {
    try {
      vehicleUpdateSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => err.message);
        throw new ValidationError('Erro de validação', errors);
      }
      throw error;
    }
  }
}
