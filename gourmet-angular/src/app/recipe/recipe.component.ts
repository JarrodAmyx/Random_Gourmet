import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  @Output() invokeParent = new EventEmitter<any>();

  searchTerm: string = '';
  searchBool: boolean = false;
  loggedIn: boolean = false;
  favToggle: boolean = false;

  private baseUrl = 'http://54.183.139.183';
  private token: string = localStorage.getItem('token')!;
  
  searchResults:Items[] = [];
  searchResults2: Result[] = [];
  displaySize: number = 5;
  // resultSize = [search query size]/[displaySize] rounded up
  resultSize: number = 3;
  currentPage: number = 1;

  items: Items[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private http: HttpClient
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

  clickRecipe(other: Result): void{
    // placeholder for API/database call
    console.log(other.title); 
  }

  searchRecipe(): void{
    const output = {
      string: this.searchTerm,
      Boolean: this.favToggle
    }

    const result = this.invokeParent.emit(output);
  }

  setResults(other: any): void{
    // clears array
    this.searchResults2 = []

    for(let stuff of other){
      this.searchResults2.push(new Result(stuff.recipeId, stuff.title, stuff.recipeImage, false))
    }

    console.log(this.searchResults2)
    this.searchBool = true;
  }

  toggleFav(): void{
    this.favToggle = !this.favToggle
  }

  favRecipe(other: Result): void{
    const params = {
      userId : this.token,
      recipeId: other.ID
    }

    this.http.get(`${this.baseUrl}/api/user-recipe-create`, { params }).subscribe(
      (response: any) => {
        console.log(response);
        other.fav = true;
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );
  }

  unfavRecipe(other: Result): void{
    const params = {
      userId : this.token,
      recipeId: other.ID
    }

    this.http.get(`${this.baseUrl}/api/user-recipe-destroy`, { params }).subscribe(
      (response: any) => {
        console.log(response);
        other.fav = false;
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );
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