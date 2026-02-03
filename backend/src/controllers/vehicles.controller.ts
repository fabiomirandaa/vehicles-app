import { Request, Response, NextFunction } from 'express';
import { VehiclesService } from '../services/vehicles.service';

export class VehiclesController {
  constructor(private service: VehiclesService) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicle = await this.service.create(req.body);
      res.status(201).json(vehicle);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicles = await this.service.findAll();
      res.status(200).json(vehicles);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicle = await this.service.findById(req.params.id);
      res.status(200).json(vehicle);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicle = await this.service.update(req.params.id, req.body);
      res.status(200).json(vehicle);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
