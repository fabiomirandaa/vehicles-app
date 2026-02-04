import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { VehiclesStore } from '../../services/vehicles.store';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss',
})
export class VehiclesListComponent implements OnInit {
  private router = inject(Router);
  protected store = inject(VehiclesStore);

  ngOnInit() {
    this.store.loadAll();
  }

  onSearch(term: string) {
    this.store.searchTerm.set(term);
  }

  onCreate() {
    this.router.navigate(['/vehicles/new']);
  }

  onEdit(vehicle: Vehicle) {
    this.router.navigate(['/vehicles', vehicle.id, 'edit']);
  }

  onDelete(vehicle: Vehicle) {
    const confirmed = window.confirm(
      `Deseja realmente excluir o veículo ${vehicle.placa}?`
    );

    if (confirmed) {
      this.store.delete(vehicle.id);
    }
  }

  getBrandColor(marca: string): string {
    const colors: Record<string, string> = {
      Honda: '#e74c3c',
      Toyota: '#e67e22',
      Volkswagen: '#3498db',
      Chevrolet: '#f39c12',
      Fiat: '#9b59b6',
      Hyundai: '#1abc9c',
      Jeep: '#34495e',
      Ford: '#2ecc71',
      Nissan: '#c0392b',
      Renault: '#f1c40f',
    };
    return colors[marca] || '#95a5a6';
  }
}
