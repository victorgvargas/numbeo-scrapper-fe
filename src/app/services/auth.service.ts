import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) { }

  login(email: string, password: string) {
    return this._http.post(`${BASE_URL}/auth/login`, { email, password });
  }

  register(username: string, email: string, password: string) {
    return this._http.post(`${BASE_URL}/auth/register`, { username, email, password });
  }

  logout() {
    return this._http.post(`${BASE_URL}/auth/logout`, {});
  }
}
