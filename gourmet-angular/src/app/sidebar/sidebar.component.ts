import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
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
}