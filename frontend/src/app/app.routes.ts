import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/vehicles',
    pathMatch: 'full',
  },
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./vehicles/components/vehicles-list/vehicles-list.component').then(
        (m) => m.VehiclesListComponent
      ),
  },
  {
    path: 'vehicles/new',
    loadComponent: () =>
      import('./vehicles/components/vehicle-form/vehicle-form.component').then(
        (m) => m.VehicleFormComponent
      ),
  },
  {
    path: 'vehicles/:id/edit',
    loadComponent: () =>
      import('./vehicles/components/vehicle-form/vehicle-form.component').then(
        (m) => m.VehicleFormComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/vehicles',
  },
];
