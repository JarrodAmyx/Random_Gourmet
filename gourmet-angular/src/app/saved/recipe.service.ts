// recipe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://54.183.139.183';

  constructor(private http: HttpClient) {}

  getUserRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/user-recipe-read`);
  }
}
