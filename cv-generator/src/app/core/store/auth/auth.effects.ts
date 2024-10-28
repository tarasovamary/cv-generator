import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
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
          catchError((error) => of(AuthActions.loginFailure({ error }))),
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
