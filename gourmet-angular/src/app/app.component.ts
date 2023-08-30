import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog/login-dialog.component'; // Path to your LoginDialogComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodOvers';
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
}