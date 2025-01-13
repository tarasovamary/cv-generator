import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsListComponent } from './projects-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Project } from '../../models/project.model';
import * as ProjectsActions from '../../store/projects.actions';

describe('ProjectsListComponent', () => {
  let component: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;
  let mockStore: MockStore;
  let mockActions: Actions;
  let router: Router;
  let route: ActivatedRoute;
  let confirmationService: ConfirmationService;
  let messageService: MessageService;

  const mockProjects: Project[] = [
    {
      _id: '1',
      name: 'Project A',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-01'),
      teamSize: '5',
      techStack: ['Angular', 'Node.js', 'MongoDB'],
      roles: ['Frontend Developer', 'Backend Developer'],
      description: 'A project management tool',
      responsibilities: 'Develop UI and backend APIs',
    },
    {
      _id: '2',
      name: 'Project B',
      startDate: new Date('2023-05-01'),
      teamSize: '3',
      techStack: ['React', 'Firebase'],
      roles: ['Fullstack Developer'],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsListComponent, TableModule, ConfirmDialogModule],
      providers: [
        provideMockStore(),
        provideMockActions(() => mockActions),
        provideRouter([]),
        ConfirmationService,
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
		router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    confirmationService = TestBed.inject(ConfirmationService);
    messageService = TestBed.inject(MessageService);
    
    component.projects$ = of(mockProjects);

    fixture.detectChanges();
  });

  it('should create ProjectsListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have projects$', (done) => {
    component.projects$.subscribe((projects) => {
      expect(projects.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should display projects in the table', (done) => {
    component.projects$.subscribe((projects) => {
      expect(projects.length).toBe(2);
      expect(projects[0].name).toBe('Project A');
      expect(projects[1].name).toBe('Project B');
      done();
    });
  });

  it('should dispatch resetCurrentProject and navigate to create project page', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const navigateSpy = spyOn(router, 'navigate');

    component.onCreateProject();

    expect(dispatchSpy).toHaveBeenCalledWith(ProjectsActions.resetCurrentProject());
    expect(navigateSpy).toHaveBeenCalledWith(['../create'], { relativeTo: route });
  });

  it('should dispatch getProjectById and navigate to the project page', () => {
    const projectId = '1';

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const navigateSpy = spyOn(router, 'navigate');

    component.onSelect(projectId);

    expect(dispatchSpy).toHaveBeenCalledWith(ProjectsActions.getProjectById({id: projectId}));
    expect(navigateSpy).toHaveBeenCalledWith(['../', projectId], { relativeTo: route });
  });

  it('should delete the project by id', () => {
    const stopPropagationSpy = jasmine.createSpy('stopPropagation');
    const event = { stopPropagation: stopPropagationSpy } as unknown as MouseEvent;
    const id = '123';

    spyOn(confirmationService, 'confirm').and.callFake((config) => {
      // Simulate clicking the "accept" button
      config.accept();
      // Return the service instance
      return confirmationService;
    });
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    component.onDelete(id, event);

    expect(stopPropagationSpy).toHaveBeenCalled(); // Check stopPropagation
    expect(confirmationService.confirm).toHaveBeenCalled(); // Check confirmation dialog
    expect(dispatchSpy).toHaveBeenCalledWith(ProjectsActions.deleteProjectById({ id })); // Check store dispatch
  });

  it('should reject deletion the project and show cancellation message', () => {
    const stopPropagationSpy = jasmine.createSpy('stopPropagation');
    const event = { stopPropagation: stopPropagationSpy } as unknown as MouseEvent;
    const id = '123';

    spyOn(confirmationService, 'confirm').and.callFake((config) => {
      config.reject(); // Simulate "reject" action
      return confirmationService; // Return the service instance
    });
    const messageSpy = spyOn(messageService, 'add');

    component.onDelete(id, event);

    expect(stopPropagationSpy).toHaveBeenCalled(); // Check stopPropagation
    expect(confirmationService.confirm).toHaveBeenCalled(); // Ensure confirm was called
    expect(messageSpy).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Cancelled',
      detail: 'Project deletion cancelled',
    }); // Ensure cancellation message was shown
  });
});
