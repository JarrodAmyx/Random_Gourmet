import { Component, OnInit, Input } from '@angular/core';

export interface recipe {
  recipeID: number,
  title: string,
  ingredientIDs: number[],
  description: string
}

@Component({
  selector: 'app-recipecard-list',
  templateUrl: './recipecard-list.component.html',
  styleUrls: ['./recipecard-list.component.css']
})
export class RecipecardListComponent implements OnInit{
  @Input() _dataset: Array<recipe> = []

  constructor(

  ) { }

  ngOnInit(): void {

  }
}
