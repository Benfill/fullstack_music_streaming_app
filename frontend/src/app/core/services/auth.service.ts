import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.api.baseUrl;
  private endpoints = environment.api.endpoints.auth;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}${this.endpoints.login}`, {
      email,
      password
    });
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}${this.endpoints.register}`, {
      email,
      password
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${this.endpoints.logout}`, {});
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.roles.includes('ROLE_ADMIN') ?? false;
  }

  private getCurrentUser(): AuthResponse['user'] | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
