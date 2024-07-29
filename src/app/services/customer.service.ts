import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDetailDto } from '../dtos/customer-detail-dto';
import { Observable } from 'rxjs';
import { PolicyDto } from '../dtos/policy-dto';
import { PolicyCustomer } from '../dtos/policy-customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  createCustomer(customerData: any) {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<CustomerDetailDto[]>(`${this.apiUrlForCustomer}`, customerData ,{headers});
  }
  getCustomerByIdentificationNumber(tcNumber: string) {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = { 'Authorization': `Bearer ${token}` };
    const params = new HttpParams().set('identificationNumber', tcNumber);
    return this.http.get<CustomerDetailDto[]>(`${this.apiUrlForCustomer}/check-customer-exist`, { headers, params });
  }

  private apiUrl = 'http://localhost:8080/policy';
  private apiUrlForCustomer = 'http://localhost:8080/api/v1/customer';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<CustomerDetailDto[]> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<CustomerDetailDto[]>(`${this.apiUrlForCustomer}/customers`, {headers});
  }

  getCustomerPolicies(customerId: number): Observable<PolicyCustomer[]> {
    const token = localStorage.getItem('authToken'); // Token'ı localStorage'dan alıyoruz
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<PolicyCustomer[]>(`${this.apiUrl}/policies/${customerId}`, {headers});
  }
}
