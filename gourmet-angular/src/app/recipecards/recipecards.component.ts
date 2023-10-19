import { SharedService } from './../shared/shared.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-recipecards',
  templateUrl: './recipecards.component.html',
  styleUrls: ['./recipecards.component.css']
})
export class RecipecardsComponent {

  constructor(
    private SharedService: SharedService,
    public dialogRef:MatDialogRef<String>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
}
