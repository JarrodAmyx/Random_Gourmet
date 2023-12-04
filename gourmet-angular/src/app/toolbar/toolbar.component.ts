import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  loggedIn: boolean = false;

  data: any;
  constructor(
    private apiService: ApiService, 
    private sharedService: SharedService, 
    private router: Router,
    private authService: AuthService
    ) {
      this.authService.isLoggedIn().subscribe((status) => {
        this.loggedIn = status;
      });
    }

  openRegistration(): void {
    this.sharedService.openRegistration();
  }

  ngOnInit() {
    this.apiService.getData().subscribe((result) => {
      this.data = result;
    });
  }

  openLogin(): void {
    this.sharedService.openLogin();
  }

  logout(): void {
    this.authService.logout();
  }
}
