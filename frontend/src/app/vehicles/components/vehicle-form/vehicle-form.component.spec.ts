import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleFormComponent } from './vehicle-form.component';
import { VehiclesStore } from '../../services/vehicles.store';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let mockStore: jasmine.SpyObj<VehiclesStore>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj(
      'VehiclesStore',
      [],
      {
        loading: signal(false),
      }
    );

    await TestBed.configureTestingModule({
      imports: [VehicleFormComponent, NoopAnimationsModule],
      providers: [
        { provide: VehiclesStore, useValue: mockStore },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({
      placa: '',
      chassi: '',
      renavam: '',
      modelo: '',
      marca: '',
      ano: null,
    });
  });

  it('should validate required fields', () => {
    expect(component.form.valid).toBeFalse();

    component.form.patchValue({
      placa: 'ABC1234',
      chassi: '12345678901234567',
      renavam: '12345678901',
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2020,
    });

    expect(component.form.valid).toBeTrue();
  });

  it('should validate placa length', () => {
    const placaControl = component.form.get('placa');

    placaControl?.setValue('ABC');
    expect(placaControl?.hasError('minlength')).toBeTrue();

    placaControl?.setValue('ABC1234');
    expect(placaControl?.hasError('minlength')).toBeFalse();
  });

  it('should validate chassi length', () => {
    const chassiControl = component.form.get('chassi');

    chassiControl?.setValue('123456789');
    expect(chassiControl?.hasError('minlength')).toBeTrue();

    chassiControl?.setValue('12345678901234567');
    expect(chassiControl?.hasError('minlength')).toBeFalse();
  });

  it('should validate renavam length', () => {
    const renavamControl = component.form.get('renavam');

    renavamControl?.setValue('123456');
    expect(renavamControl?.hasError('minlength')).toBeTrue();

    renavamControl?.setValue('12345678901');
    expect(renavamControl?.hasError('minlength')).toBeFalse();
  });

  it('should validate ano range', () => {
    const anoControl = component.form.get('ano');
    const currentYear = new Date().getFullYear();

    anoControl?.setValue(1800);
    expect(anoControl?.hasError('min')).toBeTrue();

    anoControl?.setValue(currentYear + 2);
    expect(anoControl?.hasError('max')).toBeTrue();

    anoControl?.setValue(2020);
    expect(anoControl?.valid).toBeTrue();
  });

  it('should transform placa to uppercase', () => {
    const placaControl = component.form.get('placa');
    placaControl?.setValue('abc1234');
    placaControl?.updateValueAndValidity();

    expect(placaControl?.value).toBe('ABC1234');
  });

  it('should transform chassi to uppercase', () => {
    const chassiControl = component.form.get('chassi');
    chassiControl?.setValue('abc12345678901234');
    chassiControl?.updateValueAndValidity();

    expect(chassiControl?.value).toBe('ABC12345678901234');
  });
});
