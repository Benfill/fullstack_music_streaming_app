import { AuthState } from './auth.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(() => console.log('Login action dispatched')),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials.username, credentials.password).pipe(
          tap(response => {
            console.log('Login response received:', response);
          }),
          map(response => {
            console.log('Dispatching loginSuccess with user:', response);
            return AuthActions.loginSuccess({ user: response });
          }),
          catchError(error => {
            console.error('Login error:', error);
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          console.log('LoginSuccess effect triggered with user:', user);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ userData: {username, password} }) =>
        this.authService.register(username, password).pipe(
          map(response => AuthActions.registerSuccess({ user: response.user })),
          catchError(error => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess()))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/auth/login']))
      ),
    { dispatch: false }
  );

  // serverDown$ = createEffect(() => {
  //   this.actions$.pipe(
  //     ofType(AuthActions.serverDown),
  //     mergeMap(() => {

  //     })
  //   )
  // })

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
