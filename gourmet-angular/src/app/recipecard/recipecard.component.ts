import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


// general reference for how the data should be formatted
export interface recipe {
  recipeID: number,
  title: string,
  ingredientIDs: number[],
  description: string
}

@Component({
  selector: 'app-recipecard',
  templateUrl: './recipecard.component.html',
  styleUrls: ['./recipecard.component.css']
})
export class RecipecardComponent implements OnInit{
  @Input() public data: any;

  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(RecipecardDialog,{
      data: this.data,
      width: '50vw',
      height: '40vw'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Recipe Card Opened`);
    });
  }
  public  ngOnInit(): void { }
}

@Component({
  selector: 'recipecard-dialog',
  templateUrl: 'recipecard.dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatCardModule,MatListModule],
})
export class RecipecardDialog {

  recipeId: string = '';
  title: string = '';
  description: string = '';
  requiredIngredients: string = '';
  recipeImage: string = '';

  constructor(
    public dialogRef: MatDialogRef<RecipecardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    ) {
      const params = {
        recipeId: data.message
      }      

      this.http.get(`http://54.183.139.183/api/recipe-read`, { params }).subscribe(
        (response: any) => {
          console.log(response);
          this.title = response.title;
          this.description = response.description;
          this.requiredIngredients = response.requiredIngredients;
          this.recipeImage = response.recipeImage;

          console.log(this.requiredIngredients)
          console.log(this.description)
        },
        (error) => {
          console.error('Request failed:', error);
          return -1;
        }
      );
    }


}

