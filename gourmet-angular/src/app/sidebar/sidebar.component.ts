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

  toggleButton(button: { label: string, color: string, selected: boolean }): void {
    button.selected = !button.selected;
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}