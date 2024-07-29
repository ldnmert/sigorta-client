import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PolicyDto } from '../dtos/policy-dto';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {


 
  private apiUrl = 'http://localhost:8080/api/vehicles'; // Backend API URL

  constructor(private http: HttpClient) { }

  getYears(): Observable<string[]> {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<string[]>(`${this.apiUrl}/years`,{headers});
  }

  getMakes(): Observable<string[]> {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<string[]>(`${this.apiUrl}/makes`,{headers});
  }

  getModels(make: string): Observable<string[]> {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<string[]>(`${this.apiUrl}/models`, { params: { make } , headers});
  }

  getVehicleCode(year: number, make: string, model: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/vehicle-code`, { params: { year, make, model }, headers });
  }

  private apiUrl2 = 'http://localhost:8080/api/v1/insurance'; // Backend API URL



  submitOffer(vehicleCode: string, customerId: number, offerData: any): Observable<PolicyDto> {
    const params = new HttpParams()
      .set('vehicleCode', vehicleCode)
      .set('customerId', customerId.toString());

      const token = localStorage.getItem('authToken');
      const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<PolicyDto>(`${this.apiUrl2}/car`, offerData, { params , headers});
  }
}
