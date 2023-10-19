import { Component, HostListener } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  isSidebarOpen = true; // Initially open
  isSmallScreen = false;

  constructor(private sharedService: SharedService) {}

  // Listen for window resize events to determine screen size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth <= 576; // Adjust the breakpoint as needed
  }

  toggleSidebar() {
    console.log('Button clicked');
  }
}