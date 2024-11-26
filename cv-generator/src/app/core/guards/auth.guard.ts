import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accessToken = inject(AuthService).getAccessToken();

  if (!accessToken) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
