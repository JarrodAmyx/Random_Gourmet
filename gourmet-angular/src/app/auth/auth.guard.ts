import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from './auth.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1), // Take only the first emitted value
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          console.log('AuthGuard return true');
          return true; // User is authenticated, allow access
        } else {
          console.log('AuthGuard return false');
          this.router.navigate(['/landing-page']); // Redirect to the landing page if not authenticated
          return false; // Prevent access to the route
        }
      })
    );
  }
}