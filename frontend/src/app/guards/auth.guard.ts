// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Check if user is authenticated by verifying JWT token
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
