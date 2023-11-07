import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { SECURE_ROUTES } from './routes/secure.routes';
import { PUBLIC_ROUTES } from './routes/public.routes';

const appRoutes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
/*{ path: '', redirectTo: '/landing-page', pathMatch: 'full' },*/
{ path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
{ path: '', component: SecureComponent, canActivate: [/*SecureGuardService*/], data: { title: 'Secure Views' }, children: SECURE_ROUTES }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }