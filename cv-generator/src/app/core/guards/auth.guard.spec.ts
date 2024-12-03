import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['getAccessToken']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
  });

  function mockRouteSnapshot(): ActivatedRouteSnapshot {
    return {} as ActivatedRouteSnapshot; // Empty object as it is not used in guard
  }

  function mockRouterStateSnapshot(): RouterStateSnapshot {
    return {} as RouterStateSnapshot; // Empty object as it is not used in guard
  }

  it('should allow navigation if access token exists (user is logged in)', () => {
    mockAuthService.getAccessToken.and.returnValue('valid-token');
    const canActivate = executeGuard(mockRouteSnapshot(), mockRouterStateSnapshot());

    expect(canActivate).toBeTrue(); // Access allowed
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should block navigation and redirect to /login if access token does not exist (user is not logged in)', () => {
    mockAuthService.getAccessToken.and.returnValue(null);
    const canActivate = executeGuard(mockRouteSnapshot(), mockRouterStateSnapshot());

    expect(canActivate).toBeFalse(); // Access denied
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
