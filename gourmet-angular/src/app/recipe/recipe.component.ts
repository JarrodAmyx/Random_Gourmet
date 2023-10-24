import { Component, OnInit, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export class Items{
  constructor(public ID: number, public name: string, public deleted: boolean){}
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  isMobile: boolean = false;

  searchTerm: string = '';
  searchResults:Items[] = [];
  searchBool: boolean = false;
  items: Items[] = [];

  constructor(private breakpointObserver: BreakpointObserver){
    this.items.push(new Items(1, 'Burger', false));
    this.items.push(new Items(2, 'Steak', false));
    this.items.push(new Items(3, 'Ham Burger', false));
    this.items.push(new Items(4, 'Fish', false));
    this.items.push(new Items(5, 'Fishburger', false));
    this.items.push(new Items(6, 'Burger', false));
    this.items.push(new Items(7, 'Steak', false));
    this.items.push(new Items(8, 'Ham Burger', false));
    this.items.push(new Items(9, 'Fish', false));
    this.items.push(new Items(10, 'Fishburger', false));
    this.items.push(new Items(11, 'Burger', false));
    this.items.push(new Items(12, 'Steak', false));
    this.items.push(new Items(13, 'Ham Burger', false));
    this.items.push(new Items(14, 'Fish', false));
    this.items.push(new Items(15, 'Fishburger', false));
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

  undoDelete(other: Items): void{
    other.deleted = false;
  }

  loadMoreData(): void {
    console.log('Scrolled to the bottom. Loading more data...');
  }
}
