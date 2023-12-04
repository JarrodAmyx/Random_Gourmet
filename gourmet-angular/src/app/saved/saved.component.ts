import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { AuthService } from '../auth/auth.service';

export class Items{
  constructor(public ID: number, public name: string, public fav: boolean){}
}

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  isMobile: boolean = false;
  savedRecipes: any[] = [];
  loggedIn: boolean = false;

  searchResults:Items[] = [];
  displaySize: number = 5;
  // resultSize = [search query size]/[displaySize] rounded up
  resultSize: number = 3;
  currentPage: number = 1;

  items: Items[] = [];

  constructor(private recipeService: RecipeService, private authService: AuthService) {}

  ngOnInit() {
    this.loadSavedRecipes();
    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
    });
  }

  loadSavedRecipes() {
    this.recipeService.getUserRecipes().subscribe(
      (data) => {
        this.savedRecipes = data;
      },
      (error) => {
        console.error('Error fetching saved recipes:', error);
      }
    );
  }

  // Add other methods from recipe.component.ts if needed
  clickRecipe(recipe: any): void {
    // Placeholder for API/database call
    console.log(recipe.name);
  }

  get displayItems(): Items[]{
    const startIndex = (this.currentPage - 1) * this.displaySize;
    return this.items.slice(startIndex, startIndex + this.displaySize);
  }

  unfavRecipe(recipe: any): void {
    // Placeholder for backend call
    recipe.fav = false;
  }
}
