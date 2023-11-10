import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://54.183.139.183'; // Replace with your backend API URL
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  // Method to perform user login
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    return this.http.post(`${this.baseUrl}/api/login`, loginData).pipe(
      tap((response: any) => {
        // If login is successful, store the JWT token in local storage or a cookie
        const token = response.token; // Adjust the property name as needed
        localStorage.setItem('token', token);
        this.loggedIn.next(true);
        this.router.navigate(['/home'])
      }),
      catchError((error) => {
        // Handle login error here (e.g., display an error message)
        console.error('Login failed:', error);
        throw error; // Rethrow the error to propagate it to the component
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    const registrationData = { username, password };
  
    return this.http.post(`${this.baseUrl}/api/user-create`, registrationData).pipe(
      tap((response: any) => {
        // If registration is successful, store the JWT token in local storage or a cookie
        const token = response.token; // Adjust the property name as needed
        localStorage.setItem('token', token);
        this.loggedIn.next(true); // Set the user as logged in
      }),
      catchError((error) => {
        // Handle registration error here (e.g., display an error message)
        console.error('Registration failed:', error);
        throw error; // Rethrow the error to propagate it to the component
      })
    );
  }

  // Method to check if the user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Method to perform user logout
  logout(): void {
    // Clear the JWT token from local storage
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/landing-page']);
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.'); // Adjust the error message as needed
  }
}