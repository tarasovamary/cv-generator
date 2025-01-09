import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Employee } from '../../employees/models/employee.model';
import { Project } from '../../projects/models/project.model';
import { CV } from '../models/cv.model';
import { CvService } from './cv.service';

describe('CvService', () => {
  let service: CvService;
  let httpTestingController: HttpTestingController;

  const mockCv: CV = {
    _id: '1',
    employeeId: '123',
    name: 'CV1',
    department: 'IT',
    specialization: 'Frontend Developer',
    skills: ['Angular', 'TypeScript'],
    projects: ['Project A'],
  };

  const mockEmployees: Employee[] = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      specialization: 'Software Developer',
    },
    {
      _id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      department: 'Marketing',
      specialization: 'Content Writer',
    },
  ];

  const mockProjects: Project[] = [
    {
      _id: '1',
      name: 'Project A',
      startDate: new Date('2022-01-01'),
      teamSize: '5',
      techStack: ['Angular', 'Node.js'],
      roles: ['Developer'],
      description: 'A project description',
      responsibilities: 'Frontend development',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CvService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all CVs', () => {
    service.getAllCvs().subscribe((cvs) => {
      expect(cvs).toEqual([mockCv]);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/cv');
    expect(req.request.method).toBe('GET');
    req.flush([mockCv]);
  });

  it('should get all CVs for an employee', () => {
    const employeeId = '123';

    service.getAllCvForEmployee(employeeId).subscribe((cvs) => {
      expect(cvs).toEqual([mockCv]);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/employees/${employeeId}/cv`);
    expect(req.request.method).toBe('GET');
    req.flush([mockCv]);
  });

  it('should get a CV by ID', () => {
    const cvId = '1';

    service.getCvById(cvId).subscribe((cv) => {
      expect(cv).toEqual(mockCv);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/cv/${cvId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCv);
  });

  it('should delete a CV by ID', () => {
    const cvId = '1';

    service.deleteCvById(cvId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/cv/${cvId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should create a CV', () => {
    service.createCv(mockCv).subscribe((cv) => {
      expect(cv).toEqual(mockCv);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/employees/123/cv`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCv);
    req.flush(mockCv);
  });

  it('should update a CV', () => {
    const cvId = '1';
    const payload = { name: 'Updated CV' };

    service.updateCv(cvId, payload).subscribe((cv) => {
      expect(cv).toEqual(mockCv);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/cv/${cvId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(payload);
    req.flush(mockCv);
  });

  it('should get all employees', () => {
    service.getAllEmployees().subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/employees');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should get all projects', () => {
    service.getAllProjects().subscribe((projects) => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });
});
