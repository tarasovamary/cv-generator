import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { CreateEmployeeComponent } from './create-employee.component';

describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponent;
  let fixture: ComponentFixture<CreateEmployeeComponent>;
  let mockStore: MockStore;
  let mockActions: Actions;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployeeComponent],
      providers: [provideMockStore(), provideMockActions(() => mockActions)],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEmployeeComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockActions = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create CreateEmployeeComponent', () => {
    expect(component).toBeTruthy();
  });
});
