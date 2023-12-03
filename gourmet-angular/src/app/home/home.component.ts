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
  isMobile = false;
  loggedIn: boolean = false;

  private baseUrl = 'http://54.183.139.183';
  private token: string = localStorage.getItem('token')!;

  @ViewChild(SidebarComponent) sidebar: any;
  @ViewChild(RecipeComponent) recipe: any;
  
  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private http: HttpClient,
    ) {
      this.authService.isLoggedIn().subscribe((status) => {
        this.loggedIn = status;
      });
    }

  // Listen for window resize events to determine screen size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth <= 576; // Adjust the breakpoint as needed
  }

  toggleSidebar() {
    console.log('Button clicked');
  }

  toggleSearch ($event:any){
    console.log(Object.keys(this.sidebar.subcategoryStates));

    const params = {
      ingredients: JSON.stringify(Object.keys(this.sidebar.subcategoryStates)),
      search: $event.string,
      userId: this.token
    }
    //if fav is true (toggled), search user's recipe list
    if($event.Boolean){
      this.http.get(`${this.baseUrl}/api/user-recipe-search`, { params }).subscribe(
        (response: any) => {
          console.log(response);
          this.recipe.setResults(response.message);
        },
        (error) => {
          console.error('Request failed:', error);
          return -1;
        }
      );
    }
    //if fav is false, search all of the database
    else{
      this.http.get(`${this.baseUrl}/api/recipe-search`, { params }).subscribe(
        (response: any) => {
          console.log(response);
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