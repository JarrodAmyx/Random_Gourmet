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
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}


}

