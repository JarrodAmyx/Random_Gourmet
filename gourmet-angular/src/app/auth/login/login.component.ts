import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../shared/shared.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  openRegistration(): void {
    this.dialogRef.close();
    this.sharedService.openRegistration();
  }

  onSubmit(): void {
    this.authService.login(this.Email, this.password).subscribe(
      (response) => {
        // Successful login
        // Store the token, navigate to another page, or perform other actions
      },
      (error) => {
        // Handle login error
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}