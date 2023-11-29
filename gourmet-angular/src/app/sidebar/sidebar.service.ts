// sidebar.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private baseUrl = 'http://54.183.139.183'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}
/*

  getSelectedMenuItem(): string {
    // Implement logic to get the selected menu item if needed
    return null;
  }

  setSelectedMenuItem(item: string): void {
    // Implement logic to set the selected menu item if needed
  }
*/
  // Add method to make an HTTP POST request to add an ingredient
  addIngredient(userId: string, ingredient: any): Observable<any> {
    const url = `${this.baseUrl}/api/add-ingredient/${userId}`;
    return this.http.post(url, ingredient);
  }

  // Add method to make an HTTP DELETE request to delete an ingredient
  deleteIngredient(userId: string, ingredientId: string): Observable<any> {
    const url = `${this.baseUrl}/api/delete-ingredient/${userId}/${ingredientId}`;
    return this.http.delete(url);
  }

  // Add more methods for other HTTP requests as needed
}
