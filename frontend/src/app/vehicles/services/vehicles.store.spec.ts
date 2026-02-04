import { TestBed } from '@angular/core/testing';
import { VehiclesStore } from './vehicles.store';
import { VehiclesService } from './vehicles.service';
import { of, throwError } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

describe('VehiclesStore', () => {
  let store: VehiclesStore;
  let vehiclesServiceSpy: jasmine.SpyObj<VehiclesService>;

  const mockVehicle: Vehicle = {
    id: '1',
    placa: 'ABC1234',
    chassi: '12345678901234567',
    renavam: '12345678901',
    modelo: 'Civic',
    marca: 'Honda',
    ano: 2020,
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('VehiclesService', [
      'getAll',
      'getById',
      'create',
      'update',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [VehiclesStore, { provide: VehiclesService, useValue: spy }],
    });

    store = TestBed.inject(VehiclesStore);
    vehiclesServiceSpy = TestBed.inject(
      VehiclesService
    ) as jasmine.SpyObj<VehiclesService>;
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with empty vehicles', () => {
    expect(store.vehicles()).toEqual([]);
    expect(store.loading()).toBe(false);
  });

  it('should load vehicles successfully', (done) => {
    vehiclesServiceSpy.getAll.and.returnValue(of([mockVehicle]));

    store.loadAll();

    setTimeout(() => {
      expect(store.vehicles()).toEqual([mockVehicle]);
      expect(store.loading()).toBe(false);
      done();
    }, 100);
  });

  it('should handle load vehicles error', (done) => {
    const error = new Error('Load failed');
    vehiclesServiceSpy.getAll.and.returnValue(throwError(() => error));

    store.loadAll();

    setTimeout(() => {
      expect(store.vehicles()).toEqual([]);
      expect(store.loading()).toBe(false);
      done();
    }, 100);
  });

  it('should filter vehicles by search term', (done) => {
    const vehicles: Vehicle[] = [
      { ...mockVehicle, id: '1', placa: 'ABC1234' },
      { ...mockVehicle, id: '2', placa: 'XYZ5678' },
    ];
    vehiclesServiceSpy.getAll.and.returnValue(of(vehicles));

    store.loadAll();

    setTimeout(() => {
      store.searchTerm.set('XYZ');
      expect(store.filteredVehicles().length).toBe(1);
      expect(store.filteredVehicles()[0].placa).toBe('XYZ5678');
      done();
    }, 100);
  });

  it('should create vehicle successfully', (done) => {
    const newVehicle = {
      placa: 'ABC1234',
      chassi: '12345678901234567',
      renavam: '12345678901',
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2020,
    };
    vehiclesServiceSpy.create.and.returnValue(of(mockVehicle));

    store.create(newVehicle);

    setTimeout(() => {
      expect(store.vehicles()).toContain(mockVehicle);
      done();
    }, 100);
  });

  it('should delete vehicle successfully', (done) => {
    vehiclesServiceSpy.getAll.and.returnValue(of([mockVehicle]));
    vehiclesServiceSpy.delete.and.returnValue(of(void 0));

    store.loadAll();

    setTimeout(() => {
      store.delete('1');
      setTimeout(() => {
        expect(store.vehicles().length).toBe(0);
        done();
      }, 100);
    }, 100);
  });
});
