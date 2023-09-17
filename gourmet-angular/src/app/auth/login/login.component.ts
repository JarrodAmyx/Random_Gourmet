import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginDialogComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  openRegistration(): void {
    this.dialogRef.close();
    this.sharedService.openRegistration();
  }

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