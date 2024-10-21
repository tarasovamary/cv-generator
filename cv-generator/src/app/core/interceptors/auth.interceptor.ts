import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(AuthService).getAccessToken();

  // Skip login requests
  if (req.url.includes('/login')) {
    return next(req);
  }

  // Add access-token for the request
  const newReq = accessToken
    ? req.clone({
        setHeaders: {
          'x-access-token': accessToken,
        },
      })
    : req;

  return next(newReq);
};
