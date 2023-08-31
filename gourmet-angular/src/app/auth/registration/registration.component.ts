import { Component, Output, EventEmitter } from '@angular/core';

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

  constructor(private sharedService: SharedService) {}

  @Output() registrationSubmit: EventEmitter<any> = new EventEmitter();

  openLoginDialog(): void {
    this.sharedService.openLoginDialog();
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