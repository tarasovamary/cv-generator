import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { User } from '../../models/user.model';

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
            const user: User = response.body as User;
            const accessToken = response.headers.get('x-access-token') || '';
            const refreshToken = response.headers.get('x-refresh-token') || '';
            this.setSession(user._id, accessToken, refreshToken);

            return AuthActions.loginSuccess({ user, accessToken, refreshToken });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    );
  });

  private setSession(userId: string, accessToken: string, refreshToken: string): void {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }
}
