import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsListComponent } from './projects-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { selectAllProjects } from '../../store/projects.selectors';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Project } from '../../models/project.model';

describe('ProjectsListComponent', () => {
  let component: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;
  let mockStore: MockStore;
  let mockActions: Actions;

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
});
