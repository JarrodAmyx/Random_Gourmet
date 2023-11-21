import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from '../../landing-page/landing-page.component';
import { LoginComponent } from '../../auth/login/login.component';
import { RegistrationComponent } from '../../auth/registration/registration.component';

// below imports are for front end routing
  // app-routing.module.ts
  import { NgModule } from '@angular/core';
  //import { AuthGuard } from './auth/auth.guard';
  import { PublicComponent } from '../public/public.component';
  import { SecureComponent } from '../secure/secure.component';
import { AuthGuard } from '@app/auth/auth.guard';
import { SECURE_ROUTES } from './secure.routes';
  /* 
  import { PublicComponent } from './navigation/public/public.component';
  import { SecureComponent } from './navigation/secure/secure.component';
  import { SECURE_ROUTES } from './navigation/routes/secure.routes';
  import { PUBLIC_ROUTES } from './navigation/routes/public.routes';
  */

export const PUBLIC_ROUTES: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent }
  //{ path: 'resetpassword', component: ForgotPasswordComponent }
  ];

const appRoutes: Routes = [
  { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
