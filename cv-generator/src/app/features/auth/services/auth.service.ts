import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(token: string) {
    localStorage.setItem('access-token', token);
  }

  login(email: string, password: string): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, { email, password }, { observe: 'response' });
  }

  signup(email: string, password: string): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.apiUrl}/users`, { email, password }, { observe: 'response' });
  }

  getNewAccessToken(): Observable<HttpResponse<any>> {
    return this.http
      .get(`${this.apiUrl}/users/me/access-token`, {
        headers: {
          'x-refresh-token': this.getRefreshToken() || '',
          _id: this.getUserId() || '',
        },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          const newAccessToken = res.headers.get('x-access-token');
          if (newAccessToken) {
            this.setAccessToken(newAccessToken);
          }
        }),
        catchError((error) => {
          console.error('Error refreshing access token', error);
          return throwError(() => error);
        }),
      );
  }

  /**
   * Related to Logout
   */

  removeSession(): void {
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  /**
   * Related to Login/Signup
   */

  setSession(userId: string, accessToken: string, refreshToken: string): void {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }

  handleAuthSuccess(user: User, accessToken: string, refreshToken: string) {
    this.setSession(user._id, accessToken, refreshToken);
    this.router.navigate(['/home']);
    return { user, accessToken, refreshToken };
  }

  handleAuthResponse(response: HttpResponse<any>) {
    const user: User = response.body as User;
    const accessToken = response.headers.get('x-access-token') || '';
    const refreshToken = response.headers.get('x-refresh-token') || '';
    return this.handleAuthSuccess(user, accessToken, refreshToken);
  }
}
