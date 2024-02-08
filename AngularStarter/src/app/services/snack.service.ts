import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError(): void {
    const snackBarRef = this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000
    });

    // Use a local subscription and properly unsubscribe to avoid memory leaks
    const snackBarSub: Subscription = snackBarRef.onAction().pipe(
      tap(() => this.router.navigate(['/login']))
    ).subscribe({
      next: () => {
        snackBarSub.unsubscribe(); // Ensure the subscription is cleaned up after the action is taken
      },
      error: (err) => {
        console.error('Snack bar action error:', err);
        snackBarSub.unsubscribe(); // Ensure the subscription is cleaned up if an error occurs
      }
    });
  }
}
