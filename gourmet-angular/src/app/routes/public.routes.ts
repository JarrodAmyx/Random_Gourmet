import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from '../landing-page/landing-page.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { HomeComponent } from '../home/home.component';

export const PUBLIC_ROUTES: Routes = [
  /*{ path: '', redirectTo: '/landing-page', pathMatch: 'full' },*/
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
  //{ path: 'resetpassword', component: ForgotPasswordComponent }
  ];