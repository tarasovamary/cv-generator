import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  if (
    req.url.includes('/users/login') ||
    req.url.includes('/users/signup') ||
    req.url.includes('/users/me/access-token')
  ) {
    return next(req);
  }

  const authReq = accessToken
    ? req.clone({
        setHeaders: { 'x-access-token': accessToken },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.getNewAccessToken().pipe(
          map((res: HttpResponse<any>) => {
            const newAccessToken = res.headers.get('x-access-token');
            if (!newAccessToken) {
              throw new Error('Failed to retrieve new access token');
            }
            return newAccessToken;
          }),
          switchMap((newAccessToken) => {
            const retryReq = req.clone({
              setHeaders: { 'x-access-token': newAccessToken },
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};
