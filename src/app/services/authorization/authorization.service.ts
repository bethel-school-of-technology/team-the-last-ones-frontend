import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  baseUrl: string = 'http://localhost:5251/api/auth';
  token: string = 'myAppToken';

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
          localStorage.setItem(this.token, response);
          console.log(`${this.token}: ${response}`);
        })
      );
  }

  GetToken(): string {
    return this.token;
  }
}
