import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ProfileComponent } from '../profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(public dialog: MatDialog, private router: Router) {}

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '30vw', // Adjust the width as needed
      //height: '40vw',
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }

  openRegistration(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '30vw', // Adjust the width as needed
      //height: '40vw',
      panelClass: 'custom-dialog-container', // Apply a custom CSS class
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Registration dialog closed');
      // You can handle any post-dialog-closed logic here
    });
  }
}