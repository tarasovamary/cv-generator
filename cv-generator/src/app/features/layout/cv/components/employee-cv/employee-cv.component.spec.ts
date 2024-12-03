import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { EmployeeCvComponent } from './employee-cv.component';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('EmployeeCvComponent', () => {
  let component: EmployeeCvComponent;
  let fixture: ComponentFixture<EmployeeCvComponent>;
  let mockStore: MockStore;
  let mockActions: Actions;

  beforeEach(async () => {
    const activatedRoute = {
      parent: {
        snapshot: {
          paramMap: convertToParamMap({ id: '123' }), // Mock route paramMap
        },
      },
    };

    // Mock the store selectors
    mockStore = jasmine.createSpyObj('MockStore', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      imports: [EmployeeCvComponent],
      providers: [
        provideMockStore(),
        provideMockActions(() => mockActions),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ConfirmationService, useValue: {} },
        { provide: MessageService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeCvComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockActions = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create EmployeeCvComponent', () => {
    expect(component).toBeTruthy();
  });
});
