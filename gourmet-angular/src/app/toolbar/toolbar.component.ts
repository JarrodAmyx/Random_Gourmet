import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private sharedService: SharedService) {}

  openRegistration(): void {
    this.sharedService.openRegistration();
  }

  openLogin(): void {
    this.sharedService.openLogin();
  }
}
