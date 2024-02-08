import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { SnackService } from '../services/snack.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private snack: SnackService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return authState(this.auth).pipe(
      take(1),
      map(user => {
        const isLoggedIn = !!user;
        if (!isLoggedIn) {
          this.snack.authError(); // Show authentication error message or redirect
          this.router.navigate(['/login']); // Redirect to login or another appropriate route
        }
        return isLoggedIn;
      })
    );
  }
}
