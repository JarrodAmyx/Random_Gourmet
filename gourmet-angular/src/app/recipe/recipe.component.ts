import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SharedService } from '../shared/shared.service';

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
  loggedIn: boolean = false;
  favToggle: boolean = false;

  private baseUrl = 'http://54.183.139.183';
  private token: string = localStorage.getItem('token')!;
  
  searchResults: Result[] = [];
  displaySize: number = 10;
  // resultSize = [search query size]/[displaySize] rounded up
  resultSize: number = 0;
  currentPage: number = 1;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private http: HttpClient,
    private sharedService: SharedService
    ){
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

    // waits for sidebar to load
    setTimeout(() => {
      this.searchRecipe();
    }, 1000);
    
  }

  clickRecipe(other: Result): void{
    this.sharedService.openRecipe(other.ID);
  }

  searchRecipe(): void{
    const output = {
      string: this.searchTerm,
      Boolean: this.favToggle
    }

    this.invokeParent.emit(output);
  }

  setResults(other: any): void{
    // clears array
    this.searchResults = []
    // goes to first page
    this.currentPage = 1
    
    const params = {
      userId : this.token
    }

    this.http.get(`${this.baseUrl}/api/user-recipe-read`, { params }).subscribe(
      (response: any) => {
        // console.log('fav')
        // console.log(response.message)
        for(let stuff of other){
          if(String(response.message).includes(String(stuff.recipeId))){
            this.searchResults.push(new Result(stuff.recipeId, stuff.title, stuff.recipeImage, true))
          }
          else{
            this.searchResults.push(new Result(stuff.recipeId, stuff.title, stuff.recipeImage, false))
          }
        }
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );

    // resultSize = [search query size]/[displaySize] rounded up
    this.resultSize = Math.ceil(this.searchResults.length/this.displaySize)

    // console.log(this.searchResults)
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
        // console.log(response);
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
        // console.log(response);
        other.fav = false;
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );
  }

  get displayItems(): Result[]{
    const startIndex = (this.currentPage - 1) * this.displaySize;
    return this.searchResults.slice(startIndex, startIndex + this.displaySize);
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