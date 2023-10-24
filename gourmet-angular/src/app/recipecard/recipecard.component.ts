import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';

export interface recipe {
  name: string,
  ingredients: string[],
  direct: string
}
var RECIPETEST:recipe[] =[
  {name: "test", ingredients: ['test1', 'test2', 'test3'], direct: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum aliquam erat, interdum posuere massa tristique a. Morbi in lobortis erat. Duis et efficitur risus. In scelerisque purus at massa laoreet finibus. Morbi dictum sit amet nunc nec placerat. Etiam faucibus justo nec viverra venenatis. Etiam nulla metus, malesuada nec efficitur vitae, convallis at nibh. Aliquam at erat semper libero elementum dapibus. Nullam bibendum pellentesque urna, at aliquam leo fringilla et. Suspendisse non mattis lectus, sit amet vehicula metus. Curabitur et nunc quis nulla pulvinar iaculis id et ipsum.'},
  {name: "Hamburger", ingredients: ['test1', 'test2', 'test3'], direct: 'Nulla nec odio et turpis ultricies semper. Quisque efficitur lacus turpis, venenatis laoreet ante fermentum nec. Fusce consectetur dignissim libero, eu commodo lorem imperdiet id. Aenean in tellus egestas, cursus ex eget, condimentum nisi. Pellentesque commodo lectus id turpis porta, eget lobortis enim auctor. Vestibulum quis nibh in leo interdum posuere quis non justo. Nam sed sodales ex, et vestibulum felis. Curabitur accumsan non tortor non congue. Donec hendrerit, velit a mollis facilisis, nulla leo accumsan ligula, quis vestibulum eros leo in turpis. Sed nec lorem et massa feugiat posuere et ut dui. Pellentesque eget quam pharetra, rhoncus justo pulvinar, pellentesque quam. Proin tincidunt nulla quis lorem elementum lobortis. Donec feugiat congue justo, ac feugiat metus volutpat at. Nullam nulla libero, feugiat rhoncus dolor id, porttitor ornare nisl. Cras aliquet dapibus sapien, eget pulvinar lectus facilisis non.'},
  {name: "Fish and Chips", ingredients: ['test1', 'test2', 'test3'], direct: 'Donec tristique est id nibh egestas rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In lacinia lacus id sapien varius, in pharetra nisi pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras mattis purus nisl, ut viverra nulla sodales sit amet. Donec vitae placerat odio. Vivamus non lorem pulvinar risus condimentum ultrices a eget diam. Aenean dapibus mauris pharetra sapien imperdiet, pretium vulputate dui luctus. Suspendisse potenti. Quisque tempus dui dignissim sem interdum, vitae hendrerit velit commodo. Phasellus ornare sit amet ipsum in elementum. Phasellus purus libero, suscipit nec ante tristique, dictum ullamcorper velit. Nam et porta dolor, et condimentum ipsum. Cras ullamcorper magna metus, sodales ullamcorper odio faucibus at. Fusce dictum augue nunc, non lobortis dolor ultricies semper.'},
  {name: "Chicken Nuggets", ingredients: ['test1', 'test2', 'test3'], direct: 'Phasellus vehicula eleifend laoreet. Aenean id vulputate nisi, vitae blandit massa. In hac habitasse platea dictumst. Nunc id malesuada sapien, eu congue turpis. In iaculis eleifend quam. Curabitur sed orci commodo, blandit ante eget, pretium dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sed tellus vitae orci laoreet bibendum eu sed nisl. Etiam ultricies felis elit, ut semper sem efficitur at. Praesent ac metus pretium justo hendrerit sollicitudin. Cras dapibus leo vitae bibendum pretium. Vivamus nulla massa, fringilla ut condimentum quis, commodo et ex.' },
]
@Component({
  selector: 'app-recipecard',
  templateUrl: './recipecard.component.html',
  styleUrls: ['./recipecard.component.css']
})
export class RecipecardComponent {
  constructor(public dialog: MatDialog) {}
  recipeTest = RECIPETEST;
  openDialog() {
    const dialogRef = this.dialog.open(RecipecardDialog,{
      data: RECIPETEST,
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
export class RecipecardDialog {

  constructor(public dialogRef: MatDialogRef<RecipecardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


}

