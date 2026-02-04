import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from '../models/vehicle.model';
import { environment } from '../../../environments/environment';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpMock: HttpTestingController;

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
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiclesService],
    });

    service = TestBed.inject(VehiclesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all vehicles', () => {
    const mockVehicles = [mockVehicle];

    service.getAll().subscribe((vehicles) => {
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/vehicles`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });

  it('should get vehicle by id', () => {
    service.getById('1').subscribe((vehicle) => {
      expect(vehicle).toEqual(mockVehicle);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/vehicles/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicle);
  });

  it('should create vehicle', () => {
    const newVehicle = {
      placa: 'ABC1234',
      chassi: '12345678901234567',
      renavam: '12345678901',
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2020,
    };

    service.create(newVehicle).subscribe((vehicle) => {
      expect(vehicle).toEqual(mockVehicle);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/vehicles`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newVehicle);
    req.flush(mockVehicle);
  });

  it('should update vehicle', () => {
    const updateData = {
      placa: 'ABC1234',
      chassi: '12345678901234567',
      renavam: '12345678901',
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2020,
    };

    service.update('1', updateData).subscribe((vehicle) => {
      expect(vehicle).toEqual(mockVehicle);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/vehicles/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateData);
    req.flush(mockVehicle);
  });

  it('should delete vehicle', () => {
    service.delete('1').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/vehicles/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
