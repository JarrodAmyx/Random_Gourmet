import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-recipecard',
  templateUrl: './recipecard.component.html',
  styleUrls: ['./recipecard.component.css']
})
export class RecipecardComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      width: '50vw',
      height: '40vw'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Recipe Card Opened`);
    });
  }
}

@Component({
  selector: 'recipecard-dialog',
  templateUrl: 'recipecard.dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatCardModule,MatListModule],
})
export class DialogContentExampleDialog {
}

