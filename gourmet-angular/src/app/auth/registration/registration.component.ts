import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { SharedService } from '../../shared/shared.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  registerForm : FormGroup;

  constructor(
    private sharedService: SharedService, 
    private http: HttpClient, 
    public dialogRef: MatDialogRef<RegistrationComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.registerForm = new FormGroup({
        username: new FormControl<string>(''),
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password1: new FormControl<string>('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(8)]),
        password2: new FormControl<string>('', [Validators.required, this.passwordDuplicateValid()]),
      });  
  }

  @Output() registrationSubmit: EventEmitter<any> = new EventEmitter();

  openLogin(): void {
    this.dialogRef.close();
    this.sharedService.openLogin();
  }

  onSubmit(): void {
    console.log(this.registerForm.get('password2'));
  
    // Create an object with the registration data
    const registrationData = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password1')?.value,
    };

    const apiUrl = 'http://localhost:8080';
  
    // Create an observer object with appropriate handlers
    const observer = {
      next: (response: any) => {
        // Handle success response from the backend
        console.log('Registration successful', response);

        // Optionally, you can close the dialog or perform other actions
        this.dialogRef.close();
      },
      error: (error: any) => {
        // Handle error response from the backend
        console.error('Registration failed', error);

        // Optionally, you can display an error message to the user
      }
    };

    // Subscribe to the observable with the observer
    const subscription: Subscription = this.http.post(apiUrl, registrationData).subscribe(observer);

  }



  passwordDuplicateValid() {
    return (control: AbstractControl) => {
      const value = control.value;

        if (!value) {
            return null;
        }

        return value != this.registerForm.get('password1')?.value ? {duplicate:true}: null;
    };
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password1(){
    return this.registerForm.get('password1');
  }

  get password2(){
    return this.registerForm.get('password2');
  }


}