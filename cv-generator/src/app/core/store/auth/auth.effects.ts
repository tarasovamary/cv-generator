import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((response) => {
            const { user, accessToken, refreshToken } = this.authService.handleAuthResponse(response);
            return AuthActions.loginSuccess({ user, accessToken, refreshToken });
          }),
          catchError((error) => {
            const errorMessage =
              error.error?.message || 'Login failed! \nPlease try again. Check your email and password.';
            return of(AuthActions.loginFailure({ error: errorMessage }));
          }),
        ),
      ),
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap((action) =>
        this.authService.signup(action.email, action.password).pipe(
          map((response) => {
            const { user, accessToken, refreshToken } = this.authService.handleAuthResponse(response);
            return AuthActions.signupSuccess({ user, accessToken, refreshToken });
          }),
          catchError((error) => of(AuthActions.signupFailure({ error }))),
        ),
      ),
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.authService.logout()),
      map(() => {
        return AuthActions.logoutSuccess();
      }),
      catchError((error) => of(AuthActions.loginFailure({ error }))),
    );
  });
}
