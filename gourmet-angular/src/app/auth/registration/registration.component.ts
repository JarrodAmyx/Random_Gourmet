import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { SharedService } from '../../shared/shared.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  errorMessage: string = '';

  registerForm : FormGroup;
  baseUrl = 'http://54.183.139.183';

  constructor(
    private authService: AuthService,
    private sharedService: SharedService, 
    private http: HttpClient, 
    public dialogRef: MatDialogRef<RegistrationComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.registerForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password1: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(8)]),
        password2: new FormControl('', [Validators.required, this.passwordDuplicateValid()]),
      }); 
  }

  @Output() registrationSubmit: EventEmitter<any> = new EventEmitter();

  openLogin(): void {
    this.dialogRef.close();
    this.sharedService.openLogin();
  }

  onSubmit(): void {
    const email = this.getEmail()?.value;
    const password1 = this.getPassword1()?.value;
  
    if (email && password1) {
      this.authService.register(email, password1).subscribe(
        (response) => {
          // Successful registration
          // You can choose to navigate to another page or display a success message.
          // Automatically log in the user after successful registration
          this.authService.login(email, password1).subscribe(
            (loginResponse) => {
              // Successful login
              // Store the token, navigate to another page, or perform other actions
            },
            (loginError) => {
              // Handle login error if necessary
            }
          );
          this.dialogRef.close();
        },
        (error) => {
          // Handle registration error
          this.errorMessage = 'Registration failed';
        }
      );
    }
  }


  whiteSpace() {
    return (control: AbstractControl) => {
      const value = control.value;

        if (!value) {
            return null;
        }
        return String(value).indexOf(' ') >= 0 ? {whitespace:true}: null;
    };
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

  getEmail(){
    return this.registerForm.get('email');
  }

  getPassword1(){
    return this.registerForm.get('password1');
  }

  getPassword2(){
    return this.registerForm.get('password2');
  }
}