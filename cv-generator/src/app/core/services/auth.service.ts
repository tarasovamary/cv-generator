// auth-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }

  login(email: string, password: string): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, { email, password }, { observe: 'response' });
  }

  signup(email: string, password: string): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.apiUrl}/users`, { email, password }, { observe: 'response' });
  }
}
