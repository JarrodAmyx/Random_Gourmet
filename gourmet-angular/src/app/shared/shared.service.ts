import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LoginDialogComponent } from '../auth/login-dialog/login-dialog.component';
import { RegistrationComponent } from '../auth/registration/registration.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(public dialog: MatDialog) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
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