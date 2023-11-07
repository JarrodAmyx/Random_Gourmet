import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  data: any;
  constructor(private apiService: ApiService, private sharedService: SharedService, private router: Router) {}

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
}
