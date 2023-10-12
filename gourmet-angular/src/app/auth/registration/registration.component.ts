import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<RegistrationComponent>, // Correctly inject MatDialogRef here
    @Inject(MAT_DIALOG_DATA) public data: any
            )
  {
    this.registerForm = new FormGroup({
      username: new FormControl<string>('', this.whiteSpace()),
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
    // if (this.password !== this.confirmPassword) {
    //   console.log('Passwords do not match');
    //   return;
    // }

    const registrationData = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password1')?.value,  
    };
    

    this.registrationSubmit.emit(registrationData);
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