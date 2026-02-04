import { Injectable, signal, computed, inject } from '@angular/core';
import { VehiclesService } from './vehicles.service';
import { Vehicle, VehicleCreateDto, VehicleUpdateDto } from '../models/vehicle.model';
import { ToastService } from '@core/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesStore {
  private vehiclesService = inject(VehiclesService);
  private toastService = inject(ToastService);

  vehicles = signal<Vehicle[]>([]);
  loading = signal(false);
  searchTerm = signal('');

  filteredVehicles = computed(() => {
    const search = this.searchTerm().toLowerCase();
    if (!search) return this.vehicles();

    return this.vehicles().filter(
      (v) =>
        v.placa.toLowerCase().includes(search) ||
        v.marca.toLowerCase().includes(search) ||
        v.modelo.toLowerCase().includes(search) ||
        v.chassi.toLowerCase().includes(search) ||
        v.renavam.includes(search)
    );
  });

  loadAll() {
    this.loading.set(true);
    this.vehiclesService.getAll().subscribe({
      next: (vehicles) => {
        this.vehicles.set(vehicles);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  create(data: VehicleCreateDto) {
    this.loading.set(true);
    this.vehiclesService.create(data).subscribe({
      next: (vehicle) => {
        this.vehicles.update((v) => [...v, vehicle]);
        this.loading.set(false);
        this.toastService.success('Veículo criado com sucesso!');
      },
      error: () => this.loading.set(false),
    });
  }

  update(id: string, data: VehicleUpdateDto) {
    this.loading.set(true);
    this.vehiclesService.update(id, data).subscribe({
      next: (updated) => {
        this.vehicles.update((vehicles) => vehicles.map((v) => (v.id === id ? updated : v)));
        this.loading.set(false);
        this.toastService.success('Veículo atualizado!');
      },
      error: () => this.loading.set(false),
    });
  }

  delete(id: string) {
    this.vehiclesService.delete(id).subscribe({
      next: () => {
        this.vehicles.update((vehicles) => vehicles.filter((v) => v.id !== id));
        this.toastService.success('Veículo excluído!');
      },
    });
  }
}
