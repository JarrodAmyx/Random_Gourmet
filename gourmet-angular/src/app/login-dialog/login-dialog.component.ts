import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
<<<<<<< Updated upstream:gourmet-angular/src/app/login-dialog/login-dialog.component.ts
=======
import { AuthService } from '@app/auth/auth.service';
>>>>>>> Stashed changes:gourmet-angular/src/app/auth/login-dialog/login-dialog.component.ts

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  username: string = '';
  password: string = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    // You can implement your login logic here
    // For now, let's just close the dialog
    this.dialogRef.close();
  }
}