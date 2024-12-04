import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as AuthActions from '../auth/store/auth.actions';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockStore: MockStore;
  let mockActions: Actions;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [provideMockStore(), provideMockActions(() => mockActions), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockActions = TestBed.inject(Actions);
    dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create AuthComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch signup action if form is valid', () => {
    component.isSignup = true;

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      AuthActions.signup({
        email: 'test@example.com',
        password: 'password123',
      }),
    );
  });

  it('should dispatch login action if form is valid', () => {
    component.isSignup = false;

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      AuthActions.login({
        email: 'test@example.com',
        password: 'password123',
      }),
    );
  });
});
