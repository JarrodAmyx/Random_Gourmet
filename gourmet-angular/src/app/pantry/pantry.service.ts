import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PantryService {
  private apiUrl = 'http://54.183.139.183'; // Replace with your backend API URL
  private userId:string = localStorage.getItem('token')!;
  constructor(private http: HttpClient) {}

  // Create a new ingredient in the pantry
  createIngredient(ingredient: any): Observable<any> {
    const params = {
      userId: this.userId,
      ingredientId: ingredient
    }
    return this.http.get(`${this.apiUrl}/api/user-ingredient-create`, {params});
  }

  // Delete an ingredient from the pantry by its ID
  deleteIngredient(ingredient: string): Observable<any> {
    const params = {
      userId: this.userId,
      ingredientId: ingredient
    }
    return this.http.get(`${this.apiUrl}/api/user-ingredient-destroy`,{params});
  }
}
