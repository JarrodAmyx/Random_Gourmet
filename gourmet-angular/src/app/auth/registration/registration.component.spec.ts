import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private registrationService: RegistrationService) {}

  onSubmit(userData: any): void {
    // Call the registerUser method to send the registration data to the backend
    this.registrationService.registerUser(userData).subscribe(
      (response) => {
        // Handle success response (e.g., show a success message or redirect)
      },
      (error) => {
        // Handle error response (e.g., display an error message)
      }
    );
  }
}
