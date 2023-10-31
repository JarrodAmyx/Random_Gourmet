import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule, Routes } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthService } from './auth/auth.service';
import { RegistrationService } from './auth/registration/registration.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeComponent } from './recipe/recipe.component';
import { PantryComponent } from './pantry/pantry.component';
import { RecipecardComponent } from './recipecard/recipecard.component';
import { SecureComponent } from './secure/secure.component';
import { PublicComponent } from './public/public.component';
import { LandingPageComponent } from './landing-page/landing-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    HomeComponent,
    RegistrationComponent,
    ToolbarComponent,
    ProfileComponent,
    PantryComponent,
    SecureComponent,
    PublicComponent,
    LandingPageComponent,
    RecipeComponent,
    PantryComponent,
    RecipecardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatGridListModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  providers: [AuthService, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
