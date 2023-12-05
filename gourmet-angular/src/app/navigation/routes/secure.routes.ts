import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from '../../profile/profile.component';
import { HomeComponent } from '../../home/home.component';

export const SECURE_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent }
];