import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, of } from 'rxjs';
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
            const { user, accessToken, refreshToken } = this.handleAuthResponse(response);
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
            const { user, accessToken, refreshToken } = this.handleAuthResponse(response);
            return AuthActions.signupSuccess({ user, accessToken, refreshToken });
          }),
          catchError((error) => of(AuthActions.signupFailure({ error }))),
        ),
      ),
    );
  });

  private setSession(userId: string, accessToken: string, refreshToken: string): void {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }

  private handleAuthSuccess(user: User, accessToken: string, refreshToken: string) {
    this.setSession(user._id, accessToken, refreshToken);
    this.router.navigate(['/home']);
    return { user, accessToken, refreshToken };
  }

  private handleAuthResponse(response: HttpResponse<any>) {
    const user: User = response.body as User;
    const accessToken = response.headers.get('x-access-token') || '';
    const refreshToken = response.headers.get('x-refresh-token') || '';
    return this.handleAuthSuccess(user, accessToken, refreshToken);
  }
}
