import { Dialog } from '@angular/cdk/dialog';
import { SharedService } from './../shared/shared.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-recipecards',
  templateUrl: './recipecards.component.html',
  styleUrls: ['./recipecards.component.css']
})
export class RecipecardsComponent {

  recipeName: String ='';

  // Will be used later to make it easier to build all the reciepes
  constructor(
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<RecipecardsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  openRecipeCard():void{
    const dialogRef = this.dialog.open(RecipecardsComponent, {
      width: '50vw', // Adjust the width as needed
      height: '50vw',
      panelClass: 'dialog-content', // Apply a custom CSS class
      data: {} // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Card has closed');
    });

  }
}

