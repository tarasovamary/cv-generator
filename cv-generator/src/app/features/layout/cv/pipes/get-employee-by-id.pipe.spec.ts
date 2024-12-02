import { GetEmployeeByIdPipe } from './get-employee-by-id.pipe';
import { Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Employee } from '../../employees/models/employee.model';
import { CvState } from '../store/cv.state';

describe('GetEmployeeByIdPipe', () => {
  let pipe: GetEmployeeByIdPipe;
  let mockStore: jasmine.SpyObj<Store>;

  const mockEmployee: Employee = {
    _id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    specialization: 'Frontend Developer',
  };

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<Store<CvState>>('Store', ['select']);

    TestBed.configureTestingModule({
      providers: [GetEmployeeByIdPipe, { provide: Store, useValue: mockStore }],
    });

    pipe = TestBed.inject(GetEmployeeByIdPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Employee observable when transformed with a valid ID', (done) => {
    const employeeId = '123';

    // Mocking the store.select to return an observable with mock employee data
    mockStore.select.and.returnValue(of(mockEmployee));

    pipe.transform(employeeId).subscribe((employee) => {
      // Check that the employee returned is the same as the mock
      expect(employee).toEqual(mockEmployee);
      done();
    });
  });

  it('should return null observable when transformed with an invalid ID', (done) => {
    const employeeId = 'invalid_id';

    // Mocking the store.select to return null for invalid ID
    mockStore.select.and.returnValue(of(null));

    pipe.transform(employeeId).subscribe((employee) => {
      // Expect null when invalid ID is provided
      expect(employee).toBeNull();
      done();
    });
  });
});
