import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PolicyDto } from '../dtos/policy-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private apiUrl = 'http://localhost:8080/policy';

  constructor(private http: HttpClient) { }

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
    return this.http.get<PolicyDto[]>(this.apiUrl + '/filter-and-sort', { params, headers });
  }

  getExpiringPolicies(): Observable<PolicyDto[]> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<PolicyDto[]>(`${this.apiUrl}/expiring-policies`, { headers });
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
}
