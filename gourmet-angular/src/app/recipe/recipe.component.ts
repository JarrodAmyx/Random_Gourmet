import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export class Items{
  constructor(public ID: number, public name: string, public fav: boolean){}
}

export class Result{
  constructor(public ID: number, public title: string, public image: string, public fav: boolean){}
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  isMobile: boolean = false;

  @Output() invokeParent = new EventEmitter<string>();

  searchTerm: string = '';
  searchBool: boolean = false;
  loggedIn: boolean = false;
  favToggle: boolean = false;

  searchResults:Items[] = [];
  displaySize: number = 5;
  // resultSize = [search query size]/[displaySize] rounded up
  resultSize: number = 3;
  currentPage: number = 1;

  items: Items[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
    ){
    this.items.push(new Items(1, 'One', false));
    this.items.push(new Items(2, 'Two', false));
    this.items.push(new Items(3, 'Three', false));
    this.items.push(new Items(4, 'Four', false));
    this.items.push(new Items(5, 'Five', false));
    this.items.push(new Items(6, 'Six', false));
    this.items.push(new Items(7, 'Seven', false));
    this.items.push(new Items(8, 'Eight', false));
    this.items.push(new Items(9, 'Nine', false));
    this.items.push(new Items(10, 'Ten', false));
    this.items.push(new Items(11, 'Eleven', false));
    this.items.push(new Items(12, 'Twelve', false));
    this.items.push(new Items(13, 'Thirteen', false));
    this.items.push(new Items(14, 'Fourteen', false));
    this.items.push(new Items(15, 'Fifteen', false));

    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
    });
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  clickRecipe(other: Items): void{
    // placeholder for API/database call
    console.log(other.name); 
  }

  searchRecipe(): void{
    // skips search process if search term is empty
    // if(this.searchTerm.length === 0){
    //   this.searchBool = false;
    //   return;
    // }

    // // empties the list
    // this.searchResults = [];
    // this.searchBool = true;

    // this.items.forEach(item => {
    //   if(item.name.includes(this.searchTerm)){
    //     this.searchResults.push(item);
    //   }
    // });
    // console.log('child responds');
    this.invokeParent.emit(this.searchTerm);
  }

  toggleFav(): void{
    this.favToggle = !this.favToggle
  }

  favRecipe(other: Items): void{
    // console.log(other);
    
    // // placeholder for backend call
    // this.recipes = this.recipes.filter(item => item !== other);

    other.fav = true;
    console.log(other.name +' is ' +  other.fav)
  }

  unfavRecipe(other: Items): void{
    other.fav = false;
  }

  get displayItems(): Items[]{
    const startIndex = (this.currentPage - 1) * this.displaySize;
    return this.items.slice(startIndex, startIndex + this.displaySize);
  }

  nextPage(){
    this.currentPage++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage(){
    this.currentPage--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}