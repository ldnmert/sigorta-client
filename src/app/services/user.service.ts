import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../dtos/user-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfoUrl = 'http://localhost:8080/api/v1/user/details';

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<UserDto> {
    return this.http.get<UserDto>(this.userInfoUrl, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
}
