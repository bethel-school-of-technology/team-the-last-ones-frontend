import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { User } from '../models/user.model'; // Assuming you have a User model defined

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'https://localhost:5251/api/users'; //need correct API endpoint

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  //for future use if we want to implement user profile management
  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile/${userId}`);
  }
  updateUserProfile(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile/${userId}`, userData);
  }
  deleteUserAccount(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/profile/${userId}`);
  }

  //do we nneed this?
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }


  //for future use if we want to implement password reset functionality
  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { email });
  }
  changePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password/${userId}`, { oldPassword, newPassword });
  }
}
