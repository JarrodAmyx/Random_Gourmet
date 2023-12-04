import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {
  // Array to store pantry items retrieved from the server
  pantryItems: any[] = [];

  // Array to store categorized pantry items for display
  categorizedPantryItems: { category: string, items: any[] }[] = [];

  // Currently selected pantry item
  selectedItem: any = {};

  // Search query for filtering pantry items
  searchQuery: string = '';

  // User authentication token retrieved from local storage
  private token: string = localStorage.getItem('token')!;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Make an HTTP GET request to fetch data from your MongoDB database
    this.http.get<any[]>('http://54.183.139.183/api/allIngredients').subscribe(data => {
      this.pantryItems = data;
      this.categorizePantryItems();
    });
  }

  // Categorize pantry items based on their category
  categorizePantryItems() {
    const categories = new Set(this.pantryItems.map(item => item.category));
    this.categorizedPantryItems = [...categories].map(category => {
      return {
        category,
        items: this.pantryItems.filter(item => item.category === category)
      };
    });
  }

  // Handle search input changes and filter pantry items accordingly
  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.categorizedPantryItems = this.categorizedPantryItems.map(categoryGroup => {
      return {
        category: categoryGroup.category,
        items: categoryGroup.items.filter(item =>
          item.name.toLowerCase().includes(searchTerm)
        )
      };
    });
  }

  // Add the selected item to the user's list of ingredients
  addToIngredients(item: any) {
    const params = {
      ingredientId: item.ingredientId,
      userId: this.token
    };

    this.http.get(`http://54.183.139.183/api/user-ingredient-create`, { params }).subscribe(
      (response: any) => {
        console.log(response);
        this.categorizePantryItems();
      },
      (error) => {
        console.error('Error adding item:', error);
        // Deselects item if adding item fails
        item.selected = false;
      }
    );
  }

  // Toggle the selection state of a pantry item
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
