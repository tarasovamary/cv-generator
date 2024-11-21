import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../services/projects.service';
import * as ProjectsActions from '../store/projects.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
  ) {}

  getAllProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.getAllProjects),
      mergeMap(() =>
        this.projectsService.getAllProjects().pipe(
          map((response) => {
            //@ts-ignore
            return ProjectsActions.getAllProjectsSuccess({ projects: response.projects });
          }),
          catchError((error) => of(ProjectsActions.getAllProjectsFailure({ error }))),
        ),
      ),
    );
  });

  createProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.createProject),
      mergeMap((action) =>
        this.projectsService.createProject(action.project).pipe(
          map((response) => {
            return ProjectsActions.createProjectSuccess({ project: response });
          }),
          catchError((error) => of(ProjectsActions.createProjectFailure({ error }))),
        ),
      ),
    );
  });

  updateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      mergeMap(({ id, payload }) =>
        this.projectsService.updateProject(id, payload).pipe(
          map((response) => {
            return ProjectsActions.updateProjectSuccess({ project: response });
          }),
          catchError((error) => of(ProjectsActions.updateProjectFailure({ error }))),
        ),
      ),
    );
  });

  deleteProjectById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.deleteProjectById),
      mergeMap((action) =>
        this.projectsService.deleteProjectById(action.id).pipe(
          map(() => {
            return ProjectsActions.deleteProjectByIdSuccess({ id: action.id });
          }),
          catchError((error) => of(ProjectsActions.deleteProjectByIdFailure({ error }))),
        ),
      ),
    );
  });
}
