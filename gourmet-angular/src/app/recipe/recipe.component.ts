import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// Class to represent a result (recipe)
export class Result {
  constructor(public ID: number, public title: string, public image: string, public fav: boolean) {}
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  isMobile: boolean = false;

  @Output() invokeParent = new EventEmitter<any>();

  searchTerm: string = '';
  loggedIn: boolean = false;
  favToggle: boolean = false;

  private baseUrl = 'http://54.183.139.183';
  private token: string = localStorage.getItem('token')!;

  searchResults: Result[] = [];
  displaySize: number = 10;
  // resultSize = [search query size]/[displaySize] rounded up
  resultSize: number = 0;
  currentPage: number = 1;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private http: HttpClient
  ) {
    // Subscribe to check if the user is logged in
    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
    });
  }

  ngOnInit() {
    // Observe screen size for responsiveness
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });

    // Wait for sidebar to load before searching for recipes
    setTimeout(() => {
      this.searchRecipe();
    }, 1000);
  }

  // Placeholder method for handling click on a recipe
  clickRecipe(other: Result): void {
    console.log(other.title); // Placeholder for API/database call
  }

  // Method to trigger a search for recipes based on the search term and toggle
  searchRecipe(): void {
    const output = {
      string: this.searchTerm,
      Boolean: this.favToggle
    }

    // Emit event to invoke parent component (possibly Sidebar) with search parameters
    this.invokeParent.emit(output);
  }

  // Method to set the search results based on API response and user's saved recipes
  setResults(other: any): void {
    // Clear array and set to first page
    this.searchResults = [];
    this.currentPage = 1;

    const params = {
      userId: this.token
    }

    // Make API request to get user's saved recipes
    this.http.get(`${this.baseUrl}/api/user-recipe-read`, { params }).subscribe(
      (response: any) => {
        console.log('fav');
        console.log(response.message);
        for (let stuff of other) {
          if (String(response.message).includes(String(stuff.recipeId))) {
            this.searchResults.push(new Result(stuff.recipeId, stuff.title, stuff.recipeImage, true))
          } else {
            this.searchResults.push(new Result(stuff.recipeId, stuff.title, stuff.recipeImage, false))
          }
        }
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );

    // Calculate result size for pagination
    this.resultSize = Math.ceil(this.searchResults.length / this.displaySize);
  }

  // Method to toggle the favorite filter
  toggleFav(): void {
    this.favToggle = !this.favToggle;
  }

  // Method to add a recipe to user's favorites
  favRecipe(other: Result): void {
    const params = {
      userId: this.token,
      recipeId: other.ID
    }

    // Make API request to add recipe to user's favorites
    this.http.get(`${this.baseUrl}/api/user-recipe-create`, { params }).subscribe(
      (response: any) => {
        console.log(response);
        other.fav = true;
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );
  }

  // Method to remove a recipe from user's favorites
  unfavRecipe(other: Result): void {
    const params = {
      userId: this.token,
      recipeId: other.ID
    }

    // Make API request to remove recipe from user's favorites
    this.http.get(`${this.baseUrl}/api/user-recipe-destroy`, { params }).subscribe(
      (response: any) => {
        console.log(response);
        other.fav = false;
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );
  }

  // Getter method to display a subset of search results based on current page and display size
  get displayItems(): Result[] {
    const startIndex = (this.currentPage - 1) * this.displaySize;
    return this.searchResults.slice(startIndex, startIndex + this.displaySize);
  }

  // Method to go to the previous page
  prevPage() {
    this.currentPage--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}