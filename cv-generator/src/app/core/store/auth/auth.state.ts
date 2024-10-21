export interface AuthState {
  userId: string;
  userEmail: string;
}

export const initialState: AuthState = {
  userId: '',
  userEmail: '',
};
