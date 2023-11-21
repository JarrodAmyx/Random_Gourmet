import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from '../../profile/profile.component';
import { PantryComponent } from '../../pantry/pantry.component';
import { HomeComponent } from '../../home/home.component';

export const SECURE_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'pantry', component: PantryComponent }
];

//front end SECURE routing paths below
const appRoutes: Routes = [
  // ... other routes
  { path: 'secure', children: SECURE_ROUTES },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    // ... other modules
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
