import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipecard',
  templateUrl: './recipecard.component.html',
  styleUrls: ['./recipecard.component.css']
})
export class RecipecardComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Recipe Card Opened`);
    });
  }
}

@Component({
  selector: 'recipecard-dialog',
  templateUrl: 'recipecard.dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatCardModule],
})
export class DialogContentExampleDialog {}

