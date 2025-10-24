import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  // Call backend signup endpoint
  register(payload: any) {
    return this.http.post(`${BASE_URL}/api/auth/signup`, payload);
  }

  // Call backend signin endpoint
  login(payload: any) {
    return this.http.post(`${BASE_URL}/api/auth/login`, payload);
  }
}
