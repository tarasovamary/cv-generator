import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction(
  '[Auth] Login (Success)',
  props<{ user: User; accessToken: string; refreshToken: string }>(),
);
export const loginFailure = createAction('[Auth] Login (Failure)', props<{ error: any }>());

export const signup = createAction('[Auth] Signup', props<{ email: string; password: string }>());
export const signupSuccess = createAction(
  '[Auth] Signup (Success)',
  props<{ user: User; accessToken: string; refreshToken: string }>(),
);
export const signupFailure = createAction('[Auth] Signup (Failure)', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');
