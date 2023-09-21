import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  username: string = 'TestUser124';
  email: string = 'test@email.com';

  recipes: string[] = ['burger', 'thing', 'thing2'];


  clickRecipe(other: string){
    console.log(other);
  }
}
