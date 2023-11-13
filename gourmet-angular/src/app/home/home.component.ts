import { Component, HostListener, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { AuthService } from '../auth/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  isSidebarOpen = true; // Initially open
  isMobile = false;
  loggedIn: boolean = false;

  @ViewChild(SidebarComponent) sidebar: any;
  @ViewChild(RecipeComponent) recipe: any;
  
  constructor(
    private sharedService: SharedService,
    private authService: AuthService
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

  toggleSearch($event:any){

    // string from recipe card searchbar
    console.log($event);
    // string array
    // takes only key (ingredients)
    console.log(Object.keys(this.sidebar.subcategoryStates));
  }
}