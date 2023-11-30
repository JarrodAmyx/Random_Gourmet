// sidebar.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/env/environment'; // Import your environment file

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
//get token
//        localStorage.setItem('token', token);

  // User Endpoints
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-create`, user);
  }

  readUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-read/${userId}`);
  }

  // Ingredient Endpoints
  createIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ingredient-create`, ingredient);
  }

  readIngredient(ingredientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ingredient-read/${ingredientId}`);
  }

  destroyIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ingredient-destroy`, ingredient);
  }
  // Add more methods for other endpoints as needed
}
