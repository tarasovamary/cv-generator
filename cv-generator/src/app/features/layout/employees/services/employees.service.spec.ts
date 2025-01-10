import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../environment/environment';
import { Employee } from '../models/employee.model';
import { EmployeesService } from './employees.service';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let httpTestingController: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/employees`;

  const mockEmployees: Employee[] = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'IT',
      specialization: 'Developer',
    },
    {
      _id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      department: 'HR',
      specialization: 'Manager',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesService],
    });
    service = TestBed.inject(EmployeesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all employees', () => {
    service.getAllEmployees().subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should get an employee by ID', () => {
    const employeeId = '1';

    service.getEmployeeById(employeeId).subscribe((employee) => {
      expect(employee).toEqual(mockEmployees[0]);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${employeeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees[0]);
  });

  it('should create a new employee', () => {
    const newEmployee = mockEmployees[0];

    service.createEmployee(newEmployee).subscribe((employee) => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);
    req.flush(newEmployee);
  });

  it('should update an employee', () => {
    const employeeId = '1';
    const updatePayload: Partial<Employee> = { department: 'Marketing' };
    const updatedEmployee = mockEmployees[0];

    service.updateEmployee(employeeId, updatePayload).subscribe((employee) => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${employeeId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatePayload);
    req.flush(updatedEmployee);
  });

  it('should delete an employee', () => {
    const employeeId = '1';

    service.deleteEmployee(employeeId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${employeeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
