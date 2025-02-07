import { selectAuthStateDebug, selectIsAuthenticated } from './../../features/auth/store/auth.selectors';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      tap(isAuthenticated => {
        console.log('Auth Guard - Is Authenticated:', isAuthenticated);

        // Debug the full auth state
        this.store.select(selectAuthStateDebug).pipe(take(1)).subscribe(
          state => console.log('Auth Guard - Full Auth State:', state)
        );
      }),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('Auth Guard - Redirecting to login');
          this.router.navigate(['/auth/login']);
          return false;
        }
        console.log('Auth Guard - Access granted');
        return true;
      })
    );
  }
}
