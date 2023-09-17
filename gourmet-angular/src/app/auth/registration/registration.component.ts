import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<RegistrationComponent>, // Correctly inject MatDialogRef here
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  @Output() registrationSubmit: EventEmitter<any> = new EventEmitter();

  openLogin(): void {
    this.dialogRef.close();
    this.sharedService.openLogin();
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    const registrationData = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.registrationSubmit.emit(registrationData);
  }
}