import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  baseUrl: string = 'http://localhost:5251/api/auth';
  tokenKey: string = 'myAppToken';

  constructor(private http: HttpClient) {}

  registerUser(newUser: User) {
    return this.http.post(`${this.baseUrl}/register`, newUser);
  }

  login(email: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('password', password);

    return this.http
      .get(`${this.baseUrl}/login`, {
        params: queryParams,
        responseType: 'text',
      })
      .pipe(
        tap((response: any) => {
          localStorage.setItem(this.tokenKey, response);
          console.log(`${this.tokenKey}: ${response}`);
        })
      );
  }

  GetToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  GetUserId(): number {
    const token = this.GetToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      // TODO: REMOVE
      // console.log(decoded);
      return parseInt(decoded.sub);
    }
    return -1;
  }

  logOut(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.GetToken() != null;
  }
}
