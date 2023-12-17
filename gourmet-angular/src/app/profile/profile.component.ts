import { SharedService } from './../shared/shared.service';
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { OnInit } from '@angular/core';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  private baseUrl = 'http://54.219.188.165';
  username: string = 'TestUser124';
  email: string = 'test@email.com';

  oldPass: string = '';
  newPass1: string = '';
  newPass2: string = '';

  isEditing: boolean = false;
  private token: string = localStorage.getItem('token')!;

  updateForm : FormGroup;
  //form control 
    constructor(
      private http: HttpClient,
      private sharedService: SharedService
    )
  {
    this.updateForm = new FormGroup({
      username: new FormControl<string>('', this.whiteSpace()),
      email: new FormControl<string>('', Validators.email),
      oldPass: new FormControl<string>('', Validators.required),
      newPass1: new FormControl<string>('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(8)]),
      newPass2: new FormControl<string>('', [Validators.required, this.passwordDuplicateValid()])
    });  
  }

  passwordDuplicateValid() {
    return (control: AbstractControl) => {
      const value = control.value;

        if (!value) {
            return null;
        }

        return value != this.updateForm.get('newPass1')?.value ? {duplicate:true}: null;
    };
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


  ngOnInit(): void{
    const params = { userId: this.token };

    this.http.get(`${this.baseUrl}/api/user-read`, { params }).subscribe(
      (response: any) => {
        console.log(response);
        this.username = response.userId;
        this.email = response.email;
      },
      (error) => {
        console.error('Request failed:', error);
      }
    );

  }

  changePassword(): void{
    this.isEditing = !this.isEditing;
  }

  confirmPassword(): boolean{
    // if(this.input_username != '')
    // {
    //   console.log(this.input_username)
    // }
    // if(this.input_email != ''){
    //   console.log(this.input_email)
    // }

    if(this.newPass1 != this.newPass2){
      console.log('passwords dont match');
      return false;
    }

    console.log('old pass: ', this.oldPass);
    console.log('new pass: ', this.newPass1);
    const params = {
      userId: this.token,
      oldPass: this.oldPass,
      newPass: this.newPass1
    };

    this.http.get(`${this.baseUrl}/api/update-password`, {params}).subscribe(
      (response: any) => {
        if(response.message == false) return false;
        console.log('front: updated password: ' + response.message)
        return true;
      },
      (error) => {
        console.error('Request failed:', error);
      }
    );

    return false;
  }

  get getUsername(){
    return this.updateForm.get('username');
  }
  
  get getEmail(){
    return this.updateForm.get('email');
  }
  
}
