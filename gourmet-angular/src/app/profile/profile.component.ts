import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  username: string = 'TestUser124';
  email: string = 'test@email.com';

  input_username: string = '';
  input_email: string = '';

  isEditing: boolean = false;

  updateForm : FormGroup;
  //form control
  constructor()
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
