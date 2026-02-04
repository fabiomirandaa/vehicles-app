import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VehiclesStore } from '../../services/vehicles.store';
import { VehiclesService } from '../../services/vehicles.service';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  protected store = inject(VehiclesStore);
  private vehiclesService = inject(VehiclesService);

  form!: FormGroup;
  loading = signal(false);
  vehicleId: string | null = null;
  isEditMode = false;
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.vehicleId;

    this.initForm();

    if (this.isEditMode && this.vehicleId) {
      this.loadVehicle(this.vehicleId);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      chassi: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      renavam: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      modelo: ['', [Validators.required, Validators.minLength(1)]],
      marca: ['', [Validators.required, Validators.minLength(1)]],
      ano: [
        this.currentYear,
        [Validators.required, Validators.min(1886), Validators.max(this.currentYear + 1)],
      ],
    });
  }

  private loadVehicle(id: string) {
    this.loading.set(true);
    this.vehiclesService.getById(id).subscribe({
      next: (vehicle) => {
        this.form.patchValue(vehicle);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/vehicles']);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const data = {
      ...formValue,
      placa: formValue.placa.trim().toUpperCase(),
      chassi: formValue.chassi.trim().toUpperCase(),
      renavam: formValue.renavam.trim(),
      modelo: formValue.modelo.trim(),
      marca: formValue.marca.trim(),
      ano: Number(formValue.ano),
    };

    if (this.isEditMode && this.vehicleId) {
      this.store.update(this.vehicleId, data);
    } else {
      this.store.create(data);
    }

    setTimeout(() => this.router.navigate(['/vehicles']), 500);
  }

  onCancel() {
    this.router.navigate(['/vehicles']);
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return 'Campo obrigatório';
    if (control.errors['minlength'])
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['maxlength'])
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.errors['min']) return `Valor mínimo: ${control.errors['min'].min}`;
    if (control.errors['max']) return `Valor máximo: ${control.errors['max'].max}`;

    return 'Campo inválido';
  }
}
