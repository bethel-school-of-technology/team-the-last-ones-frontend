import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
// import { User } from '../models/user.model'; // Assuming you have a User model defined

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:5251/api/User'; //need correct API endpoint

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // loginUser(credentials: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, credentials);
  // }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/userId${userId}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

    updateUserProfile(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, userData);
  }

    deleteUserAccount(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete${userId}`);
  }

  //for future use if we want to implement password reset functionality
  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { email });
  }
  changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password/${userId}`, {
      oldPassword,
      newPassword,
    });
  }
}
