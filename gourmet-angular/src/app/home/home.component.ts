import { Component, HostListener, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AuthService } from '../auth/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isSidebarOpen = true; // Initially open
  isMobile = false; // Flag to track whether the screen is considered as mobile
  loggedIn: boolean = false; // Flag to track user login status

  private baseUrl = 'http://54.183.139.183'; // Base URL for API requests
  private token: string = localStorage.getItem('token')!; // Retrieve user token from local storage

  @ViewChild(SidebarComponent) sidebar: any; // Reference to the SidebarComponent
  @ViewChild(RecipeComponent) recipe: any; // Reference to the RecipeComponent

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    // Subscribe to the login status to update the loggedIn flag
    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
    });
  }

  // Listen for window resize events to determine screen size and adjust the isMobile flag
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth <= 576; // Adjust the breakpoint as needed
  }

  // Method to handle the sidebar toggle button click
  toggleSidebar() {
    console.log('Button clicked');
  }

  // Method to handle search requests based on sidebar filter states and user input
  toggleSearch($event: any) {
    // console.log(Object.keys(this.sidebar.subcategoryStates));

    const params = {
      ingredients: JSON.stringify(Object.keys(this.sidebar.subcategoryStates)),
      search: $event.string,
      userId: this.token,
    };

    // If the favorite filter is true (toggled), search the user's recipe list
    if ($event.Boolean) {
      this.http.get(`${this.baseUrl}/api/user-recipe-search`, { params }).subscribe(
        (response: any) => {
          // console.log(response);
          this.recipe.setResults(response.message);
        },
        (error) => {
          console.error('Request failed:', error);
          return -1;
        }
      );
    } else {
      // If the favorite filter is false, search all of the database
      this.http.get(`${this.baseUrl}/api/recipe-search`, { params }).subscribe(
        (response: any) => {
          // console.log(response);
          this.recipe.setResults(response.message);
        },
        (error) => {
          console.error('Request failed:', error);
          return -1;
        }
      );
    }
  }
}
