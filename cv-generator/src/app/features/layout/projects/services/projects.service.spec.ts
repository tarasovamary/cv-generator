import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../../environment/environment';
import { Project } from '../models/project.model';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.apiUrl + '/projects';

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
    service = TestBed.inject(ProjectsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all projects', () => {
    service.getAllProjects().subscribe((projects) => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  it('should get a project by ID', () => {
    const projectId = '1';

    service.getProjectById(projectId).subscribe((project) => {
      expect(project).toEqual(mockProjects[0]);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects[0]);
  });

  it('should create a project', () => {
    const newProject = mockProjects[0];

    service.createProject(newProject).subscribe((project) => {
      expect(project).toEqual(newProject);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProject);
    req.flush(newProject);
  });

  it('should update a project', () => {
    const projectId = '1';
    const updatePayload = { name: 'Updated Project A' };
    const updatedProject = mockProjects[0];

    service.updateProject(projectId, updatePayload).subscribe((project) => {
      expect(project).toEqual(updatedProject);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${projectId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatePayload);
    req.flush(updatedProject);
  });

  it('should delete a project by ID', () => {
    const projectId = '1';

    service.deleteProjectById(projectId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${projectId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
