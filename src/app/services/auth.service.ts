import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/login'

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password }, { observe: 'response' }).pipe(
      tap(response => {
       console.log("response kısmı")
        const token = response.headers.get('Authorization')?.replace('Bearer ', '');
        if (token) {
          console.log(token + "MERT TTTTTT TTTT")
          localStorage.setItem('authToken', token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUserRole(): string | null {
    // Token'ı localStorage'dan alıyoruz
    const token = localStorage.getItem('authToken');
    if (!token) {
      return null; // Token yoksa rol de yok
    }
  
    // Token'ı çözümleyip payload'ı JSON olarak parse ediyoruz
    const role = this.decodeToken(token).role;
    console.log(role);
    // Rolü döndürüyoruz
    return role || null;
  }
  
  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  }
}
