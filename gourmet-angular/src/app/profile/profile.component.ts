import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  username: string = 'TestUser124';
  email: string = 'test@email.com';

  searchTerm: string = '';
  searchResults: string[] = [];
  searchBool: boolean = false;

  // random stuff for testing, needs to be called from backend later
  recipes: string[] = ['burger', 'thing', 'thing2'];


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
}
