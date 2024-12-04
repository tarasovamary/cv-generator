import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { CreateCvComponent } from './create-cv.component';

describe('CreateCvComponent', () => {
  let component: CreateCvComponent;
  let fixture: ComponentFixture<CreateCvComponent>;
  let mockStore: MockStore;
  let router: Router;

  const mockEmployees = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'Frontend',
      specialization: 'Angular',
    },
    {
      _id: '2',
      firstName: 'Jane',
      lastName: ' Smith',
      email: 'jane.smith@example.com',
      department: 'Frontend',
      specialization: 'React',
    },
  ];
  
  const mockEmployee = mockEmployees[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCvComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: 'selectEmployees', value: mockEmployees }],
        }),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCvComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    component.employees$ = of(mockEmployees);
    fixture.detectChanges();
  });

  it('should create CreateCvComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedEmployee', () => {
    const employeeId = '2';
    component.setSelectedEmployee(employeeId);

    expect(component.selectedEmployee).toEqual(mockEmployees.find((employee) => employee._id === employeeId));
  });

  it('should update selectedEmployee when onEmployeeChange is called', () => {
    component.onEmployeeChange(mockEmployee);

    expect(component.selectedEmployee).toEqual(mockEmployee);
  });

  it('should navigate correctly when onEmployeeChange is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.onEmployeeChange(mockEmployee);

    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: component['route'],
      queryParams: { employeeId: '1' },
      queryParamsHandling: 'merge',
    });
  })
});
