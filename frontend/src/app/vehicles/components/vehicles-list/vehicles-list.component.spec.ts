import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclesListComponent } from './vehicles-list.component';
import { VehiclesStore } from '../../services/vehicles.store';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('VehiclesListComponent', () => {
  let component: VehiclesListComponent;
  let fixture: ComponentFixture<VehiclesListComponent>;
  let mockStore: jasmine.SpyObj<VehiclesStore>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj(
      'VehiclesStore',
      ['loadAll'],
      {
        vehicles: signal([]),
        filteredVehicles: signal([]),
        loading: signal(false),
        searchTerm: signal(''),
      }
    );

    await TestBed.configureTestingModule({
      imports: [VehiclesListComponent, NoopAnimationsModule],
      providers: [
        { provide: VehiclesStore, useValue: mockStore },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on init', () => {
    expect(mockStore.loadAll).toHaveBeenCalled();
  });

  it('should update search term', () => {
    const searchTerm = 'ABC1234';
    component.onSearch(searchTerm);
    expect(mockStore.searchTerm.set).toHaveBeenCalledWith(searchTerm);
  });
});
