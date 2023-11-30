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
  private baseUrl = 'http://54.183.139.183';
  username: string = 'TestUser124';
  email: string = 'test@email.com';

  input_username: string = '';
  input_email: string = '';

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
    });  
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
    // console.log('profile init')
    // console.log(this.token)

    // this.http.get<any[]>('http://54.183.139.183/api/allIngredients').subscribe(data => {
    //   console.log(data)
    // });

    // this.http.get('http://54.183.139.183/api/user-read').subscribe(data => {
    //   console.log(data)
    // });

    const params = { userId: this.token };
    const id = {id: this.token};

    this.http.get('http://54.183.139.183/api/user-read', { params }).subscribe(
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

  editProfile(): void{
    if(this.isEditing == true)
      this.isEditing = false;
    else
      this.isEditing = true;
  }

  confirmEdit(): void{
    if(this.input_username != '')
    {
      console.log(this.input_username)
    }
    if(this.input_email != ''){
      console.log(this.input_email)
    }
  }

  get getUsername(){
    return this.updateForm.get('username');
  }
  
  get getEmail(){
    return this.updateForm.get('email');
  }
  
}
