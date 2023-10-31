import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {
  pantryItems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Make an HTTP GET request to fetch data from your MongoDB database
    this.http.get<any[]>('http://54.183.139.183/api/ingredients').subscribe(data => {
      this.pantryItems = data;
    });
  }

  onSearch(event: any) {
    // Implement search functionality
  }

  addToIngredients(item: any) {
    // Implement adding the selected item to a separate database or list
  }
}