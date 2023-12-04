import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from '../../profile/profile.component';
import { PantryComponent } from '../../pantry/pantry.component';
import { HomeComponent } from '../../home/home.component';
import { SavedComponent } from '../../saved/saved.component';

export const SECURE_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'pantry', component: PantryComponent },
  { path: 'saved', component: SavedComponent }
];