import {
  AfterViewInit,Component,HostBinding,OnInit,HostListener,Output,EventEmitter} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { PantryService } from '../pantry/pantry.service';
import { DropDownAnimation } from './sideAnimations';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.service';

export class Result { 
  constructor(public ingredientId: number, public name: string, public quantity: number, public unit: string, public category: string, public fav: boolean) {} 
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden', opacity: 0 })),
      state('expanded', style({ height: '*', overflow: 'visible', opacity: 1 })),
      transition('collapsed => expanded', animate('300ms ease-in')),
      transition('expanded => collapsed', animate('300ms ease-out'))
    ]),
    DropDownAnimation],
})

export class SidebarComponent implements AfterViewInit{
  isMobile: boolean = false;
  data: any;

@Output() invokeParent = new EventEmitter<any>();

  searchTerm: string = '';
  loggedIn: boolean = false;
  favToggle: boolean = false;

  private baseUrl = 'http://54.219.188.165';
  private token: string = localStorage.getItem('token')!;
  
  searchResults: Result[] = [];
  displaySize: number = 10;
  // resultSize = [search query size]/[displaySize] rounded up
  resultSize: number = 0;
  currentPage: number = 1;

// Inject Router in the constructor
constructor(
  private breakpointObserver: BreakpointObserver,
  private authService: AuthService,
  private http: HttpClient,
  private apiService: ApiService, 
  private pantryService: PantryService, 
  private router: Router) {
    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
    });
  }

  ngOnInit() {
    this.apiService.getData().subscribe((result) => {
      this.data = result;
    });
    setTimeout(() => {
      this.setResults();
    }, 1000);
  }

  ngAfterViewInit() {
    this.adjustElementsInRows();
  }

  // Placeholder method for handling click on a ingredients
  clickIngredient(other: Result): void {
    // console.log(other.name);
    //calls name of ingredient from constructor line 15
  }

   // Method to trigger a search for ingredients based on the search term and toggle
   searchIngredient(): void {
    const output = {
      string: this.searchTerm,
      Boolean: this.favToggle
    }

    // Emit event to invoke parent component (possibly Sidebar) with search parameters
    this.invokeParent.emit(output);
  }

   // Method to set the search results based on API response and user's saved ingredients
   setResults(): void {
    const params = {
      userId: this.token
    }

    // Make API request to get user's saved ingredients
    this.http.get(`${this.baseUrl}/api/user-ingredient-read`, { params }).subscribe(
      (response: any) => {
        // console.log('fav ingredients: ' + response)
        // this.toggleSubcategory(response)
        let stringArray: string[] = String(response).split(',');
        for(let stuff in stringArray)
        {
          this.subcategoryStates[stringArray[stuff]] = true;
        }
        // console.log(stringArray)
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );

    // Calculate result size for pagination
    this.resultSize = Math.ceil(this.searchResults.length / this.displaySize);
  }

  
  // Method to toggle the favorite filter aka saved user ingredeints
  toggleFav(): void {
    this.favToggle = !this.favToggle;
  }

  // Method to add a ingredeint to user's favorites
  favIngredient(other: Result): void {
    const params = {
      userId: this.token,
      ingredientId: other.ingredientId
    }

    // Make API request to add recipe to user's favorites
    this.http.get(`${this.baseUrl}/api/user-ingredient-create`, { params }).subscribe(
      (response: any) => {
        // console.log(response);
        other.fav = true;
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );
  }

   // Method to remove a recipe from user's favorites
   unfavIngredient(other: Result): void {
    const params = {
      userId: this.token,
      recipeId: other.ingredientId
    }

    // Make API request to remove ingredient from user's favorites
    this.http.get(`${this.baseUrl}/api/user-ingredient-destroy`, { params }).subscribe(
      (response: any) => {
        // console.log(response);
        other.fav = false;
      },
      (error) => {
        console.error('Request failed:', error);
        return -1;
      }
    );
  }

                          /*^^end of ingredient endpoint methods ^^*/ 

  // Update navigation methods
  handleLeftButtonClick() {
    this.router.navigate(['/']); // Navigate to home
  }

  handleRightButtonClick() {
    this.router.navigate(['/pantry']); // Navigate to pantry
  }

  adjustElementsInRows() {}
    // adjust-elements.ts code here
  handleMenuButtonClick() {}
    // Add the logic you want to execute when the left button is clicked
  handleTrashButtonClick() {}
    // Add the logic you want to execute when the right button is clicked

  isOpen = true; // Set to true to open the sidebar
  isSubOpen = false;

  subcategoryStates: { [key: string]: boolean } = {}; //pressing in the button or not

  // state of on or off of button
  toggleSubcategory(subcategory: string): void {
    // Toggle the state of the subcategory
    if (this.subcategoryStates[subcategory]) {
        // If the subcategory is already selected, remove the selection
        delete this.subcategoryStates[subcategory];

        this.removeIngredientFromPantry(subcategory); // Adjust data structure as needed
    } else {
        // If the subcategory is not selected, mark it as selected
        this.subcategoryStates[subcategory] = true;
        this.addIngredientToPantry(subcategory); // Adjust data structure as needed
    }
  }


  /* search bar*/
  // Define a variable to store the search query
  searchQuery: string = '';

  // Update the filterCategories function to hide categories/subcategories
  filterCategories(category: string): boolean {
    if (this.searchQuery === '') {
      return true; // Show all categories by default
    }

    // Check if the category or any of its subcategories match the search query
    if (
      category.toLowerCase().includes(this.searchQuery) ||
      (this.categorySubcategoryMap[category] &&
        this.categorySubcategoryMap[category].some((subcategory) =>
          subcategory.toLowerCase().includes(this.searchQuery)
        ))
    ) {
      return true;
    }
    return false;
  }

  // Method to update the search query
  onSearchInputChange(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
  }


  //need to update to output the amount of blank ingredient we actually have in that category >> next sprint
  getIngredientCount(category: string): string {
    const subcategories = this.categorySubcategoryMap[category];
    if (subcategories) {
      const totalIngredients = subcategories.length;
      const selectedIngredients = subcategories.filter(subcategory => this.subcategoryStates[subcategory]).length;
      return `${selectedIngredients} out of ${totalIngredients} Ingredients`; //placeholder for if we want to specify which ingredient
    }
    return '0 Ingredients'; // Default to 0 if there are no subcategories or category not found
  }
  //add/delete ingredients to user db

  // Example POST request to add an ingredient to the pantry
addIngredientToPantry(ingredient: any): void {
  this.pantryService.createIngredient(ingredient).subscribe(
    (response) => {
      console.log('Ingredient added to pantry:', response);
      // Handle success, update your UI, etc.
    },
    (error) => {
      console.error('Error adding ingredient to pantry:', error);
      // Handle errors
    }
  );
}

// Example DELETE request to remove an ingredient from the pantry
removeIngredientFromPantry(ingredientId: string): void {
  this.pantryService.deleteIngredient(ingredientId).subscribe(
    (response) => {
      console.log('Ingredient removed from pantry', response);
      // Handle success, update your UI, etc.
    },
    (error) => {
      console.error('Error removing ingredient from pantry:', error);
      // Handle errors
    }
  );
}

  //dropdown menu logic
  isCategoryClicked: { [key: string]: boolean } = {};
  isCategoryExpanded: { [key: string]: boolean } = {};

  toggleCategoryExpansion(category: string): void {
    this.isCategoryExpanded[category] = !this.isCategoryExpanded[category];
  }

  yourClickHandlerFunction(category: string): void {
    // expand when clicked
  this.isCategoryExpanded[category] = !this.isCategoryExpanded[category];
  }

  buttons: { label: string, color: string, selected: boolean }[] = [
    { label: 'Button 1', color: 'blue', selected: false },
    { label: 'Button 2', color: 'green', selected: false },
    { label: 'Button 3', color: 'green', selected: false },
    { label: 'Button 4', color: 'green', selected: false },
    // ... Add more button objects ...
    { label: 'more...', color: 'red', selected: false },
  ];

//major categories of food groups
categories: string[] = ["Meats", "Seafood", "Vegetables", "Fruits", "Berries", "Baking", "Grains and Cereals", "Juices",
  "Condiments", "Herbs and Spices"];

  // Subcategories of each food group
subcatMeats: string[] = ["Chicken", "Chicken Breast", "Ribeye", "T-bone", "Sirloin", "Tenderloin", "Skirt Steak", "Filet", "Turkey", "Ground Beef"];

subcatSeafood: string[] = ["Shrimp", "Crab", "Lobster", "Clam", "Squid", "Octopus", "Fish Fillet", "Salmon",
  "Tuna", "Halibut", "Snapper", "Trout", "Mahi-Mahi", "Tilapia", "Sardine", "Catfish", "Other Seafood Option"];

subcatVegetables: string[] = ["Carrot", "Broccoli", "Spinach", "Tomato", "Pepper", "Onion", "Cucumber",
  "Zucchini", "Potato", "Sweet Potato", "Mushroom", "Cabbage", "Cauliflower", "Green Bean", "Asparagus",
  "Eggplant", "Pea", "Lettuce", "Kale", "Radish", "Artichoke", "Beet", "Squash", "Okra", "Corn", "Celery",
  "Leek", "Turnip", "Other Vegetable"];

subcatFruits: string[] = ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry",
  "Raspberry", "Blackberry", "Peach", "Plum", "Cherry", "Mango", "Pineapple", "Kiwi", "Pear",
  "Lemon", "Lime", "Cantaloupe", "Watermelon", "Honeydew", "Grapefruit", "Coconut", "Pomegranate", "Avocado",
  "Papaya", "Guava", "Passion Fruit", "Apricot", "Nectarine", "Cranberry", "Fig", "Date", "Other Fruit"];

subcatBerries: string[] = ["Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cranberry",
  "Gooseberry", "Currant", "Boysenberry", "Mulberry", "Elderberry", "Huckleberry","other berry"];

subcatBaking: string[] = ["Flour", "Sugar", "Baking Powder","Milk", "Butter", "Baking Soda", "Yeast", "Vanilla Extract",
  "Cocoa Powder", "Chocolate Chips", "Nut", "Spice", "Food Coloring", "Sprinkle", "Shortening", "Cornstarch",
  "Breadcrumb", "Cornmeal", "Honey", "Maple Syrup", "Molasses", "Agave Nectar", "Cream of Tartar", "Gelatin",
  "Candied Fruit", "Pie Filling", "Marshmallow", "Other Baking Ingredient"];

subcatGrainsCereals: string[] = ["Rice", "Pasta", "Quinoa", "Oat", "Barley", "Couscous", "Millet", "Buckwheat", "Amaranth", "Bread", "Cereal", "Granola", "Cereal Bar", "Rice Cake", "Popcorn",
  "Flour", "Cornmeal", "Grit", "Other Grain and Cereal"];

subcatJuices: string[] = ["Lemon Juice", "Lime Juice", "Orange Juice", "Apple Juice", "Grape Juice", "Pineapple Juice",
  "Cranberry Juice", "Tomato Juice", "Vegetable Juice", "Pomegranate Juice", "Lemonade Concentrate", "Limeade Concentrate",
  "Other Cooking Juice"];

subcatCondiments: string[] = ["Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "Hot Sauce", "Barbecue Sauce",
  "Worcestershire Sauce", "Vinegar", "Salad Dressing", "Relish", "Pickle", "Salsa", "Sriracha", "Hoisin Sauce",
  "Teriyaki Sauce", "Fish Sauce", "Tahini", "Hummus", "Jam", "Jelly", "Peanut Butter", "Nutella", "Gravy",
  "Marinara Sauce", "Pizza Sauce", "Tartar Sauce", "Cocktail Sauce", "Horseradish", "Sour Cream", "Cream Cheese",
  "Other Condiment"];

subcatHerbsSpices: string[] = ["Salt", "Pepper", "Basil", "Thyme", "Rosemary", "Oregano", "Cilantro", "Parsley", "Sage",
  "Dill", "Mint", "Chive", "Coriander", "Cumin", "Paprika", "Chili Powder", "Cayenne Pepper", "Turmeric", "Ginger",
  "Nutmeg", "Cinnamon", "Clove", "Allspice", "Cardamom", "Bay Leaf", "Fennel", "Tarragon", "Marjoram", "Lavender",
  "Vanilla", "Saffron", "Mustard Seed", "Caraway Seed", "Poppy Seed", "Other Herb and Spice"];

  //each major categories' icons for sidebar header
  categoryImages: { [key: string]: string } = {
    Meats: 'assets/category-images/meats.png',
    Seafood: 'assets/category-images/seafood.png',
    Vegetables: 'assets/category-images/vegetables.png',
    Fruits: 'assets/category-images/fruits.png',
    Berries: 'assets/category-images/berries.png',
    Baking: 'assets/category-images/baking.png',
    'Grains and Cereals': 'assets/category-images/grains.png',
    Juices: 'assets/category-images/juices.png',
    Condiments: 'assets/category-images/condiments.png',
    'Herbs and Spices': 'assets/category-images/herbs.png',
  };

  //establish relationship bw category and its subcategories so ingredient belong to the right card
  categorySubcategoryMap: { [key: string]: string[] } = {
    Meats: this.subcatMeats,
    Seafood: this.subcatSeafood,
    Vegetables: this.subcatVegetables,
    Fruits: this.subcatFruits,
    Berries: this.subcatBerries,
    Baking: this.subcatBaking,
    'Grains and Cereals': this.subcatGrainsCereals,
    Juices: this.subcatJuices,
    Condiments: this.subcatCondiments,
    'Herbs and Spices': this.subcatHerbsSpices,
  };

  // keep track of each category's dropdown tabs condition of being open(T) and closed(F)
  categoryIsOpen: { [key: string]: boolean } = {
    Meats: false,
    Seafood: false,
    Vegetables: false,
    Fruits: false,
    Berries: false,
    Baking: false,
    'Grains and Cereals': false,
    Juices: false,
    Condiments: false,
    'Herbs and Spices': false,
  };

  //this will be for db server actions
  //still need to decide on how to adjust quantities in pantry logic wise
  ingredientsData = {
    "_id": "your_id",
    "user_id": "your_user_id",
    "ingredients": [
      {
        "name": "Ingredient 1",
        "quantity": 100,
        "unit": "grams",
        "category": "Meats",
        "MeatCutSubcategory": "Ribeye"
      },
      {
        "name": "Ingredient 2",
        "quantity": 200,
        "unit": "grams",
        "category": "Meats",
        "MeatCutSubcategory": "T-bone"
      },
      // Add more ingredients here
    ],
    "created_at": "your_created_date",
    "updated_at": "your_updated_date"
  };

  toggleButton(button: { label: string, color: string, selected: boolean }): void {
    button.selected = !button.selected;
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
//dropdown menu

  // http for adding/deleting ingredients to users
  /*
  //http request to add/delete ingredients to pantry
  constructor(private http: HttpClient) {}

  addIngredientToPantry() {
    // Implement the HTTP request to add an ingredient to the pantry
    this.http.post('apiEndpoint/addToPantry', { ingredientId: 'ingredientId' })
      .subscribe(response => {
        // Handle success
      }, error => {
        // Handle error
      });
  }

  deleteIngredientFromPantry() {
    // Implement the HTTP request to delete an ingredient from the pantry
    this.http.delete('apiEndpoint/deleteFromPantry/ingredientId')
      .subscribe(response => {
        // Handle success
      }, error => {
        // Handle error
      });
}
*/

}
