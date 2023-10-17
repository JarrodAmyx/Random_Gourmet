import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from '../profile/profile.component';
import { PantryComponent } from '../pantry/pantry.component';

export const SECURE_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'pantry', component: PantryComponent }
];