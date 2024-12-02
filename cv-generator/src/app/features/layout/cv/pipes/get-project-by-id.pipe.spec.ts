import { of } from 'rxjs';
import { GetProjectByIdPipe } from './get-project-by-id.pipe';
import { Project } from '../../projects/models/project.model';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { selectProjectById } from '../store/cv.selectors';
import { CvState } from '../store/cv.state';

describe('GetProjectByIdPipe', () => {
  let pipe: GetProjectByIdPipe;
  let mockStore: jasmine.SpyObj<Store>;

  const mockProject: Project = {
    _id: '123',
    name: 'Mock Project',
    startDate: new Date(),
    teamSize: '5',
    techStack: ['Angular', 'TypeScript'],
    roles: ['Frontend Developer'],
  };

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<Store<CvState>>('Store', ['select']);

    TestBed.configureTestingModule({
      providers: [GetProjectByIdPipe, { provide: Store, useValue: mockStore }],
    });

    pipe = TestBed.inject(GetProjectByIdPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return Project observable when transformed with a valid ID', (done) => {
    const projectId = '123';

    mockStore.select.and.returnValue(of(mockProject));

    pipe.transform(projectId).subscribe((project) => {
      // Check that the project returned is the same as the mock
      expect(project).toEqual(mockProject);
      done();
    });
  });

  it('should return null observable when transformed with an invalid ID', (done) => {
    const projectId = 'invalid_id';

    // Mocking the store.select to return null for invalid ID
    mockStore.select.and.returnValue(of(null));

    pipe.transform(projectId).subscribe((project) => {
      // Expect null when invalid ID is provided
      expect(project).toBeNull();
      done();
    });
  });
});
