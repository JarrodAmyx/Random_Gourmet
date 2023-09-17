import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components that you want to navigate to
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
//import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
  //{ path: 'profile', component: ProfileComponent }
  // Define additional routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }