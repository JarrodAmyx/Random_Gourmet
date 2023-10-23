import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-recipecards',
  templateUrl: './recipecards.component.html',
  styleUrls: ['./recipecards.component.css']
})
export class RecipecardsComponent {


  // Will be used later to make it easier to build all the reciepes
  constructor(
    public dialog: MatDialog,
  ){}

  openRecipeCard():void{
    const dialogRef = this.dialog.open(RecipeCardsDialog, {
      width: '50vw', // Adjust the width as needed
      height: '50vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Card has closed');
    });

  }
}

@Component({
  selector: 'app-recipecards-dialog',
  templateUrl: './recipecards.component.dialog.html',
  standalone: true,
  imports: [MatDialogModule],
})
export class RecipeCardsDialog {

}

