import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideRouter } from '@angular/router';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockStore: MockStore;
  let mockActions: Actions;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [provideMockStore(), provideMockActions(() => mockActions), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockActions = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create AuthComponent', () => {
    expect(component).toBeTruthy();
  });
});
