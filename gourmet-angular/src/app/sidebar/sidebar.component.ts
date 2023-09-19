import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  isOpen = true; // Set to true to open the sidebar

  buttons: { label: string, color: string, selected: boolean }[] = [
    { label: 'Button 1', color: 'blue', selected: false },
    { label: 'Button 2', color: 'green', selected: false },
    { label: 'Button 3', color: 'green', selected: false },
    { label: 'Button 4', color: 'green', selected: false },
    // ... Add more button objects ...
    { label: 'more...', color: 'red', selected: false },
  ];

  
categories: string[] = ["Meats", "Seafood", "Vegetables", "Fruits", "Berries", "Baking", "Grains and Cereals", "Juices", 
  "Condiments", "Herbs and Spices"];

  subcatMeats: string[] = ["Ribeye", "T-bone", "Sirloin", "Tenderloin", "Skirt Steak", "Filet", "Breast", "Ground Beef"];

  subcatSeafood: string[] = ["Shrimp", "Crab", "Lobster", "Clams", "Squid", "Octopus", "Fish Fillet", "Salmon",
    "Tuna", "Halibut", "Snapper", "Trout", "Mahi-Mahi", "Tilapia", "Sardines", "Catfish", "Other Seafood Options"];

  subcatVegetables: string[] = ["Carrots", "Broccoli", "Spinach", "Tomatoes", "Peppers", "Onions", "Cucumbers",
  "Zucchini", "Potatoes", "Sweet Potatoes", "Mushrooms", "Cabbage", "Cauliflower", "Green Beans", "Asparagus", 
  "Eggplant", "Peas", "Lettuce", "Kale", "Radishes", "Artichokes", "Beets", "Squash", "Okra", "Corn", "Celery", 
  "Leeks", "Turnips", "Other Vegetables"];

  subcatFruits: string[] = ["Apples", "Bananas", "Oranges", "Grapes", "Strawberries", "Blueberries", 
  "Raspberries", "Blackberries", "Peaches", "Plums", "Cherries", "Mangoes", "Pineapples", "Kiwi", "Pears", 
  "Lemons", "Limes", "Cantaloupe", "Watermelon", "Honeydew", "Grapefruit", "Coconuts", "Pomegranates", "Avocado", 
  "Papaya", "Guava", "Passion Fruit", "Apricots", "Nectarines", "Cranberries", "Fig", "Dates", "Other Fruits"];

  subcatBerries: string[] = ["Strawberries", "Blueberries", "Raspberries", "Blackberries", "Cranberries", 
  "Gooseberries", "Currants", "Boysenberries", "Mulberries", "Elderberries", "Huckleberries","other berries"];

  subcatBaking: string[] = ["Flour", "Sugar", "Baking Powder", "Baking Soda", "Yeast", "Vanilla Extract", 
  "Cocoa Powder", "Chocolate Chips", "Nuts", "Spices", "Food Coloring", "Sprinkles", "Shortening", "Cornstarch", 
  "Breadcrumbs", "Cornmeal", "Honey", "Maple Syrup", "Molasses", "Agave Nectar", "Cream of Tartar", "Gelatin", 
  "Candied Fruit", "Pie Filling", "Marshmallows", "Other Baking Ingredients"];

  subcatGrainsCereals: string[] = ["Rice", "Pasta", "Quinoa", "Oats", "Barley", "Couscous", "Millet", "Buckwheat", "Amaranth", "Bread", "Cereals", "Granola", "Cereal Bars", "Rice Cakes", "Popcorn", 
  "Flour", "Cornmeal", "Grits", "Other Grains and Cereals"];

  subcatJuices: string[] = ["Lemon Juice", "Lime Juice", "Orange Juice", "Apple Juice", "Grape Juice", "Pineapple Juice", 
  "Cranberry Juice", "Tomato Juice", "Vegetable Juice", "Pomegranate Juice", "Lemonade Concentrate", "Limeade Concentrate", 
  "Other Cooking Juices"];

  subcatCondiments: string[] = ["Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "Hot Sauce", "Barbecue Sauce", 
  "Worcestershire Sauce", "Vinegar", "Salad Dressing", "Relish", "Pickle", "Salsa", "Sriracha", "Hoisin Sauce", 
  "Teriyaki Sauce", "Fish Sauce", "Tahini", "Hummus", "Jam", "Jelly", "Peanut Butter", "Nutella", "Gravy", 
  "Marinara Sauce", "Pizza Sauce", "Tartar Sauce", "Cocktail Sauce", "Horseradish", "Sour Cream", "Cream Cheese", 
  "Other Condiments"];

  subcatHerbsSpices: string[] = ["Salt", "Pepper", "Basil", "Thyme", "Rosemary", "Oregano", "Cilantro", "Parsley", "Sage", 
  "Dill", "Mint", "Chives", "Coriander", "Cumin", "Paprika", "Chili Powder", "Cayenne Pepper", "Turmeric", "Ginger", 
  "Nutmeg", "Cinnamon", "Cloves", "Allspice", "Cardamom", "Bay Leaves", "Fennel", "Tarragon", "Marjoram", "Lavender", 
  "Vanilla", "Saffron", "Mustard Seeds", "Caraway Seeds", "Poppy Seeds", "Other Herbs and Spices"];

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

