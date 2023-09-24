import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PantryService {
  private apiUrl = 'http://localhost:8080/api/pantry'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Create a new ingredient in the pantry
  createIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, ingredient);
  }

  // Delete an ingredient from the pantry by its ID
  deleteIngredient(ingredientId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${ingredientId}`);
  }
}
