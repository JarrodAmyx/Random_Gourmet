import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodOvers';

  constructor(private sharedService: SharedService) {}

  openRegistration(): void {
    this.sharedService.openRegistration();
  }

  openLogin(): void {
    this.sharedService.openLogin();
  }


}