import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/v1/auth/login'

  constructor(private http: HttpClient) { }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(this.loginUrl, { username, password }, { observe: 'response' }).pipe(
  //     tap(response => {

  //       const token = response.headers.get('Authorization')?.replace('Bearer ', '');

  //       console.log(response.body + "responesir")
  //       if (token) {

  //         localStorage.setItem('authToken', token);
  //       }
  //     })
  //   );
  // }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password }, { observe: 'response' }, ).pipe(
      tap(response => {
        const body = response.body as { token?: string };
        const token = body?.token;
        console.log(token)
        if (token) {
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
    const token = localStorage.getItem('authToken');
    if (!token) {
      return null;
    }
  
    const payload = this.decodeToken(token);
    const role = payload.iss; 
    console.log(role);
  
    return role || null;
  }
  
  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  }

//   getUserRole(): string | null {

//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       return null; 
//     }

//     const role = this.decodeToken(token).role;
//     console.log(role);
  
//     return role || null;
//   }
  
//   decodeToken(token: string): any {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = atob(base64);
//     return JSON.parse(jsonPayload);
//   }
// }
}