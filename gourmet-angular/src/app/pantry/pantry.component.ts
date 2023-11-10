import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {
  pantryItems: any[] = [];
  categorizedPantryItems: { category: string, items: any[] }[] = [];
  selectedItem: any = {};
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Make an HTTP GET request to fetch data from your MongoDB database
    this.http.get<any[]>('http://54.183.139.183/api/allIngredients').subscribe(data => {
      this.pantryItems = data;
      this.categorizePantryItems();
    });
  }

  categorizePantryItems() {
    // Categorize the pantry items
    const categories = new Set(this.pantryItems.map(item => item.category));
    this.categorizedPantryItems = [...categories].map(category => {
      return {
        category,
        items: this.pantryItems.filter(item => item.category === category)
      };
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    // Filter the categorized pantry items based on the search term
    this.categorizedPantryItems = this.categorizedPantryItems.map(categoryGroup => {
      return {
        category: categoryGroup.category,
        items: categoryGroup.items.filter(item =>
          item.name.toLowerCase().includes(searchTerm)
        )
      };
    });
  }

  addToIngredients(item: any) {
    // Send a POST request to add the selected item
    this.http.post('http://54.183.139.183/api/user-ingredient-create', item).subscribe(
      (response) => {
        // Handle success, for example, update the UI or show a success message
        console.log('Item added successfully:', response);

        // Optionally, you can update the local list if needed
        this.categorizePantryItems();
      },
      (error) => {
        // Handle the error, for example, show an error message
        console.error('Error adding item:', error);
      });
  }

  toggleItemSelection(item: any) {
    item.selected = !item.selected; // Toggle the selected property
    if (item.selected) {
      this.addToIngredients(item); // Add the selected item to your database/list
    }
  }

  // Method to update the search query
  onSearchInputChange(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
  }

}
