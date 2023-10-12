import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private sharedService: SharedService, private router: Router) {}

  openRegistration(): void {
    this.sharedService.openRegistration();
  }

  openLogin(): void {
    this.sharedService.openLogin();
  }

  navigate(other: string): void{
    this.router.navigate(['/profile']);
  }
}
