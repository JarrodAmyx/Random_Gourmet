import { Component } from '@angular/core';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private sharedService: SharedService) {}

  openRegistration(): void {
    this.sharedService.openRegistration();
  }
}
