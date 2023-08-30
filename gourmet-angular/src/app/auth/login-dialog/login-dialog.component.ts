import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    // Simulate authentication logic (replace with actual logic)
    if (this.username === 'exampleUser' && this.password === 'examplePassword') {
      // Successful login, navigate to another page
      // You can use Angular's Router for navigation
      this.errorMessage = '';
      console.log('Login successful');
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}