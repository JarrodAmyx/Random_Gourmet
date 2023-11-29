// sidebar.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Import your environment file

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // User Endpoints
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-create`, user);
  }

  readUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-read/${userId}`);
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user-update/${userId}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user-destroy/${userId}`);
  }

  // Ingredient Endpoints
  createIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ingredient-create`, ingredient);
  }

  readIngredient(ingredientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ingredient-read/${ingredientId}`);
  }

  // Add more methods for other endpoints as needed
}
