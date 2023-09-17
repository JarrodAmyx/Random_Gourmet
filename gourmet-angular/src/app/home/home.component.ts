import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private sharedService: SharedService) {
    
  }

}
