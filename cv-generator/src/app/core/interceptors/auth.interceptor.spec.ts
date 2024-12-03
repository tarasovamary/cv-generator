import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;
  let httpClient: HttpClient;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getAccessToken', 'getNewAccessToken', 'logout']);
    authServiceSpy.getAccessToken.and.returnValue('mocked_token'); // Return fake token

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should add x-access-token header if access token is available', () => {
    httpClient.get('/test-url').subscribe();

    const req = httpMock.expectOne('/test-url');
    expect(req.request.headers.get('x-access-token')).toEqual('mocked_token');

    req.flush({ data: 'test' });
  });

  it('should not add x-access-token header if access token is not available', () => {
    authService.getAccessToken.and.returnValue(null);

    httpClient.get('/test-url').subscribe();

    const req = httpMock.expectOne('/test-url');
    expect(req.request.headers.has('x-access-token')).toBeFalse();
    req.flush({ data: 'test' });
  });

  it('should not add x-access-token for login requests', () => {
    authService.getAccessToken.and.returnValue('fake-access-token');

    httpClient.post('/users/login', {}).subscribe();

    const req = httpMock.expectOne('/users/login');
    expect(req.request.headers.has('x-access-token')).toBeFalse();
  });

  it('should not add x-access-token for signup requests', () => {
    authService.getAccessToken.and.returnValue('fake-access-token');

    httpClient.post('/users/signup', {}).subscribe();

    const req = httpMock.expectOne('/users/signup');
    expect(req.request.headers.has('x-access-token')).toBeFalse();
  });

  it('should not add x-access-token for token refresh requests', () => {
    authService.getAccessToken.and.returnValue('fake-access-token');

    httpClient.get('/users/me/access-token').subscribe();

    const req = httpMock.expectOne('/users/me/access-token');
    expect(req.request.headers.has('x-access-token')).toBeFalse();
  });

  it('should attempt to refresh token on 401 error', () => {
    const oldToken = 'old-token';
    const newToken = 'new-token';
    authService.getAccessToken.and.returnValue(oldToken);
    authService.getNewAccessToken.and.returnValue(
      of(new HttpResponse({ headers: new HttpHeaders({ 'x-access-token': newToken }) })),
    );

    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    const retryReq = httpMock.expectOne('/api/test');
    expect(retryReq.request.headers.get('x-access-token')).toBe(newToken);
  });

  it('should logout if token refresh fails', () => {
    authService.getAccessToken.and.returnValue('old-token');
    authService.getNewAccessToken.and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })),
    );

    httpClient.get('/api/test').subscribe({
      error: (error) => {
        expect(authService.logout).toHaveBeenCalled();
      },
    });

    const req = httpMock.expectOne('/api/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
