import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

export class Items{
  constructor(public ID: number, public name: string, public deleted: boolean){}
}

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

  searchTerm: string = '';
  searchResults:Items[] = [];
  searchBool: boolean = false;

  items: Items[] = [];

  updateForm : FormGroup;
  //form control
  constructor()
  {
    this.updateForm = new FormGroup({
      username: new FormControl<string>('', this.whiteSpace()),
      email: new FormControl<string>('', Validators.email),
    });  

      // random population for now
      this.items.push(new Items(1, 'Burger', false));
      this.items.push(new Items(2, 'Steak', false));
      this.items.push(new Items(3, 'Ham Burger', false));
      this.items.push(new Items(4, 'Fish', false));
      this.items.push(new Items(5, 'Fishburger', false));

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


  // function to 
  clickRecipe(other: Items): void{
    // placeholder for API/database call
    console.log(other.name); 
  }

  searchRecipe(): void{
    // skips search process if search term is empty
    if(this.searchTerm.length === 0){
      this.searchBool = false;
      return;
    }

    // empties the list
    this.searchResults = [];
    this.searchBool = true;

    this.items.forEach(item => {
      if(item.name.includes(this.searchTerm)){
        this.searchResults.push(item);
      }
    });
  }

  deleteRecipe(other: Items): void{
    // console.log(other);
    
    // // placeholder for backend call
    // this.recipes = this.recipes.filter(item => item !== other);

    other.deleted = true;
    console.log(other.name +' is ' +  other.deleted)

    
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
