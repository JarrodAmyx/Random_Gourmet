import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    // Send a POST request to your Spring Boot backend for user registration
    return this.http.post(`${this.baseUrl}/register`, userData);
  }
}