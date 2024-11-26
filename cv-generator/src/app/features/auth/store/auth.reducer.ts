import { createReducer, on } from '@ngrx/store';
import { loginSuccess, signupSuccess } from './auth.actions';
import { AuthState, initialState } from './auth.state';

export const authReducer = createReducer<AuthState>(
  initialState,

  on(
    loginSuccess,
    (state, { user }): AuthState => ({
      ...state,
      userId: user._id,
      userEmail: user.email,
    }),
  ),
  on(
    signupSuccess,
    (state, { user }): AuthState => ({
      ...state,
      userId: user._id,
      userEmail: user.email,
    }),
  ),
);
