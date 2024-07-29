import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PolicyDto } from '../dtos/policy-dto';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
 

  private apiUrlPayment = "http://localhost:8080/api/v1/payment"
  private apiUrl = 'http://localhost:8080/policy';
  private apiVehicleUrl = 'http://localhost:8080/api/v1/insurance/car'

  constructor(private http: HttpClient, private authService:AuthService) { }

  getPolicies(): Observable<PolicyDto[]> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<PolicyDto[]>(`${this.apiUrl}/policies-of-user`, { headers });
  }

  searchPolicies(policyNumber: string): Observable<PolicyDto> {
    const params = new HttpParams().set('policyNumber', policyNumber);
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<PolicyDto>(this.apiUrl + '/search-policy-number', { params, headers });
  }

  filterPolicies(status: string, sortOption: string): Observable<PolicyDto[]> {
    
    const params = new HttpParams()
      .set('status', status)
      .set('sortOption', sortOption);
      const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      if(this.authService.getUserRole() == "ROLE_USER"){
    return this.http.get<PolicyDto[]>(this.apiUrl + '/filter-and-sort', { params, headers });
  }

  else{
    return this.http.get<PolicyDto[]>("http://localhost:8080/api/v1/admin/get-policies" , { params, headers });
  }
    
  }

  getExpiringPolicies(): Observable<PolicyDto[]> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if(this.authService.getUserRole() == "ROLE_USER"){
    return this.http.get<PolicyDto[]>(`${this.apiUrl}/expiring-policies`, { headers });
    }
    else{
      return this.http.get<PolicyDto[]>("http://localhost:8080/api/v1/admin/expiringPolicies", {headers});
    }
  }

  getStatusKRatio(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<number>(`${this.apiUrl}/status-ratio`, { headers });
  }

  getTop3ExpensivePolicies(): Observable<PolicyDto[]> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<PolicyDto[]>(`${this.apiUrl}/top-three-sell`, { headers });
  }

  enablePolicy(policyNumber: string, payload: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrlPayment}/enable-policy`, payload, {
      headers: headers,
      params: { policyNumber },
    });
  }
}
