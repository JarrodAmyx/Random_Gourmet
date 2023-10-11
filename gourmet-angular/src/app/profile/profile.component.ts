import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';

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
  searchResults: string[] = [];
  searchBool: boolean = false;

  // random stuff for testing, needs to be called from backend later
  recipes: string[] = ['burger', 'thing', 'thing2'];

  updateForm : FormGroup;
  //form control
  constructor()
  {
    this.updateForm = new FormGroup({
      /* 
      working on validator pattern that declines white spaces
      */
      username: new FormControl<string>('', Validators.pattern(/[\S]/g)),
      email: new FormControl<string>('', Validators.email),
    });  
  }


  // function to 
  clickRecipe(other: string): void{
    // placeholder for API/database call
    console.log(other); 
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

    this.recipes.forEach(recipe => {
      if(recipe.includes(this.searchTerm)){
        this.searchResults.push(recipe);
      }
    });

    console.log(this.searchResults);
  }

  deleteRecipe(other: string): void{
    console.log(other);
    
    // placeholder for backend call
    this.recipes = this.recipes.filter(item => item !== other);
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
