import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService,  { provide: Router, useValue: routerSpy },],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should make a login request and return user data', () => {
    const accessToken = 'access-token';
    const mockUser: any = { _id: '123', email: 'test@example.com' };

    const mockResponse = {
      body: mockUser,
      status: 200,
      headers: new HttpHeaders().set('x-access-token', accessToken),
    };

    // Call login method
    service.login('test@example.com', 'password').subscribe(response => {
      // Verify body and headers
      expect(response.body._id).toBe('123');
      expect(response.headers.get('x-access-token')).toBe(accessToken);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/login`);

    expect(req.request.method).toBe('POST'); // Verify the method is POST
    req.flush(mockResponse.body, { headers: mockResponse.headers });
  });

  it('should make a signup request and return user data', () => {
    const accessToken = 'access-token';

    const mockUser: any = { _id: '123', email: 'test@example.com', password: 'password' };
    const mockResponse = new HttpResponse({
      body: mockUser,
      status: 200,
      headers: new HttpHeaders().set('x-access-token', accessToken),
    });

    // Call signup method
    service.signup('test@example.com', 'password').subscribe((response) => {
      // Verify body and headers
      expect(response.body).toEqual(mockUser);
      expect(response.headers.get('x-access-token')).toBe(accessToken);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', password: 'password' });
    req.flush(mockUser, { headers: mockResponse.headers });
  });


  it('should get a new access token and save it in localStorage', () => {
    const refreshToken = 'refresh-token';
    const userId = 'user-id';
    const accessToken = 'access-token';

    spyOn(service, 'getRefreshToken').and.returnValue(refreshToken);
    spyOn(service, 'getUserId').and.returnValue(userId);
    spyOn(service, 'setAccessToken');

    const mockResponse = new HttpResponse({
      body: {},
      headers: new HttpHeaders().set('x-access-token', accessToken),
    });

    service.getNewAccessToken().subscribe((response) => {
      expect(response).toBeTruthy();
      expect(service.setAccessToken).toHaveBeenCalledWith(accessToken);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/me/access-token`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-refresh-token')).toBe(refreshToken);
    expect(req.request.headers.get('_id')).toBe(userId);

    req.flush(mockResponse.body, { headers: mockResponse.headers });
  });

  it('should handle authentication response correctly', () => {
    const accessToken = 'access-token';
    const refreshToken = 'refresh-token';

    const response = new HttpResponse({
      body: { _id: 'user123', email: 'test@example.com' },
      headers: new HttpHeaders().set('x-access-token', accessToken).set('x-refresh-token', refreshToken),
    });

    const result = service.handleAuthResponse(response);

    // Verify the return value
    expect(result).toEqual({
      user: { _id: 'user123', email: 'test@example.com' },
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  });

  it('should set session information in localStorage', () => {
    const userId = 'user123';
    const accessToken = 'access-token';
    const refreshToken = 'refresh-token';

    const setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();

    service.setSession(userId, accessToken, refreshToken);

    // Verify the session is set
    expect(setItemSpy).toHaveBeenCalledWith('user-id', userId);
    expect(setItemSpy).toHaveBeenCalledWith('access-token', accessToken);
    expect(setItemSpy).toHaveBeenCalledWith('refresh-token', refreshToken);
  });

  it('should clear session and navigate to login page', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');

    service.logout();

    // Verify the session is removed
    expect(removeItemSpy).toHaveBeenCalledWith('user-id');
    expect(removeItemSpy).toHaveBeenCalledWith('access-token');
    expect(removeItemSpy).toHaveBeenCalledWith('refresh-token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set access token in localStorage', () => {
    const accessToken = 'access-token';
    const setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();

    service.setAccessToken(accessToken);

    // Check if setItem was called with correct parameters
    expect(setItemSpy).toHaveBeenCalledWith('access-token', accessToken);
  });

  it('should get access token from localStorage', () => {
    const accessToken = 'access-token';
    spyOn(localStorage, 'getItem').and.returnValue(accessToken);

    const result = service.getAccessToken();

    // Check if the correct token is retrieved
    expect(result).toBe(accessToken);
  });

  it('should get refresh token from localStorage', () => {
    const refreshToken = 'refresh-token';
    spyOn(localStorage, 'getItem').and.returnValue(refreshToken);

    const result = service.getRefreshToken();

    // Check if the correct token is retrieved
    expect(result).toBe(refreshToken);
  });

  it('should get user id from localStorage', () => {
    const userId = 'user-id';
    spyOn(localStorage, 'getItem').and.returnValue(userId);

    const result = service.getUserId();

    // Check the user id
    expect(result).toBe(userId);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
