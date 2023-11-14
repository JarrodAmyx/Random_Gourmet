import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { PublicComponent } from './navigation/public/public.component';
import { SecureComponent } from './navigation/secure/secure.component';
import { SECURE_ROUTES } from './navigation/routes/secure.routes';
import { PUBLIC_ROUTES } from './navigation/routes/public.routes';

const appRoutes: Routes = [
  { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }