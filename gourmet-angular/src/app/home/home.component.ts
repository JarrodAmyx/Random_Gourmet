import { Component, HostListener, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RecipeComponent } from '../recipe/recipe.component';

var RECIPETEST =[
  {recipeID: 1, title: "test", ingredientIDs: [5, 3, 7], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum aliquam erat, interdum posuere massa tristique a. Morbi in lobortis erat. Duis et efficitur risus. In scelerisque purus at massa laoreet finibus. Morbi dictum sit amet nunc nec placerat. Etiam faucibus justo nec viverra venenatis. Etiam nulla metus, malesuada nec efficitur vitae, convallis at nibh. Aliquam at erat semper libero elementum dapibus. Nullam bibendum pellentesque urna, at aliquam leo fringilla et. Suspendisse non mattis lectus, sit amet vehicula metus. Curabitur et nunc quis nulla pulvinar iaculis id et ipsum.'},
  {recipeID: 2, title: "Hamburger", ingredientIDs: [1,9,4], description: 'Nulla nec odio et turpis ultricies semper. Quisque efficitur lacus turpis, venenatis laoreet ante fermentum nec. Fusce consectetur dignissim libero, eu commodo lorem imperdiet id. Aenean in tellus egestas, cursus ex eget, condimentum nisi. Pellentesque commodo lectus id turpis porta, eget lobortis enim auctor. Vestibulum quis nibh in leo interdum posuere quis non justo. Nam sed sodales ex, et vestibulum felis. Curabitur accumsan non tortor non congue. Donec hendrerit, velit a mollis facilisis, nulla leo accumsan ligula, quis vestibulum eros leo in turpis. Sed nec lorem et massa feugiat posuere et ut dui. Pellentesque eget quam pharetra, rhoncus justo pulvinar, pellentesque quam. Proin tincidunt nulla quis lorem elementum lobortis. Donec feugiat congue justo, ac feugiat metus volutpat at. Nullam nulla libero, feugiat rhoncus dolor id, porttitor ornare nisl. Cras aliquet dapibus sapien, eget pulvinar lectus facilisis non.'},
  {recipeID: 3, title: "Fish and Chips", ingredientIDs: [3,6,99], description: 'Donec tristique est id nibh egestas rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In lacinia lacus id sapien varius, in pharetra nisi pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras mattis purus nisl, ut viverra nulla sodales sit amet. Donec vitae placerat odio. Vivamus non lorem pulvinar risus condimentum ultrices a eget diam. Aenean dapibus mauris pharetra sapien imperdiet, pretium vulputate dui luctus. Suspendisse potenti. Quisque tempus dui dignissim sem interdum, vitae hendrerit velit commodo. Phasellus ornare sit amet ipsum in elementum. Phasellus purus libero, suscipit nec ante tristique, dictum ullamcorper velit. Nam et porta dolor, et condimentum ipsum. Cras ullamcorper magna metus, sodales ullamcorper odio faucibus at. Fusce dictum augue nunc, non lobortis dolor ultricies semper.'},
  {recipeID: 4, title: "Chicken Nuggets", ingredientIDs: [15,38,96], description: 'Phasellus vehicula eleifend laoreet. Aenean id vulputate nisi, vitae blandit massa. In hac habitasse platea dictumst. Nunc id malesuada sapien, eu congue turpis. In iaculis eleifend quam. Curabitur sed orci commodo, blandit ante eget, pretium dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sed tellus vitae orci laoreet bibendum eu sed nisl. Etiam ultricies felis elit, ut semper sem efficitur at. Praesent ac metus pretium justo hendrerit sollicitudin. Cras dapibus leo vitae bibendum pretium. Vivamus nulla massa, fringilla ut condimentum quis, commodo et ex.' },
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  isSidebarOpen = true; // Initially open
  isMobile = false;
  recipeTest = RECIPETEST;
  @ViewChild(SidebarComponent) sidebar: any;
  @ViewChild(RecipeComponent) recipe: any;

  constructor(private sharedService: SharedService) {}

  // Listen for window resize events to determine screen size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth <= 576; // Adjust the breakpoint as needed
  }

  toggleSidebar() {
    console.log('Button clicked');
  }

  toggleSearch($event:any){

    // string from recipe card searchbar
    console.log($event);
    // string array
    // takes only key (ingredients)
    console.log(Object.keys(this.sidebar.subcategoryStates));
  }
}
