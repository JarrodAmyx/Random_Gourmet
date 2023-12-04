import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from '../../landing-page/landing-page.component';
import { LoginComponent } from '../../auth/login/login.component';
import { RegistrationComponent } from '../../auth/registration/registration.component';

export const PUBLIC_ROUTES: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
  //{ path: 'resetpassword', component: ForgotPasswordComponent }
  ];