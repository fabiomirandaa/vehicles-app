import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Vehicle, VehicleCreateDto, VehicleUpdateDto } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/vehicles`;

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl);
  }

  getById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`);
  }

  create(data: VehicleCreateDto): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl, data);
  }

  update(id: string, data: VehicleUpdateDto): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
