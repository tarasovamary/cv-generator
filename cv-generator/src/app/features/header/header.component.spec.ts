import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as AuthActions from '../auth/store/auth.actions';
import { HeaderComponent } from './header.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logout action when onLogout is called', () => {
    spyOn(mockStore, 'dispatch');

    component.onLogout();

    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
  })
});
