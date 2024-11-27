import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProjectsService } from '../services/projects.service';
import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  getAllProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.getAllProjects),
      switchMap(() =>
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

  getProjectById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.getProjectById),
      switchMap((action) =>
        this.projectsService.getProjectById(action.id).pipe(
          map((response) => {
            //@ts-ignore
            return ProjectsActions.getProjectByIdSuccess({ project: response.project });
          }),
          catchError((error) => of(ProjectsActions.getProjectByIdFailure({ error }))),
        ),
      ),
    );
  });

  createProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.createProject),
      switchMap((action) =>
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
      switchMap(({ id, payload }) =>
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
      switchMap((action) =>
        this.projectsService.deleteProjectById(action.id).pipe(
          map(() => {
            return ProjectsActions.deleteProjectByIdSuccess({ id: action.id });
          }),
          catchError((error) => of(ProjectsActions.deleteProjectByIdFailure({ error }))),
        ),
      ),
    );
  });

  redirectToProjectsList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProjectsActions.createProjectSuccess, ProjectsActions.updateProjectSuccess),
        map(() => {
          this.router.navigate([`/home/projects/list`]);
        }),
      );
    },
    { dispatch: false },
  );

  // -----------------------------------------------------------------------------------------------------
  // @ Notifications
  // -----------------------------------------------------------------------------------------------------

  createProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectsActions.createProjectSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Project created successfully' });
        }),
      ),
    { dispatch: false },
  );

  createProjectFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectsActions.createProjectFailure),
        map(() => {
          this.messageService.add({ severity: 'error', summary: 'Error creating project' });
        }),
      ),
    { dispatch: false },
  );

  updateProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectsActions.updateProjectSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Project updated successfully' });
        }),
      ),
    { dispatch: false },
  );

  updateProjectFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectsActions.updateProjectFailure),
        map(() => {
          this.messageService.add({ severity: 'error', summary: 'Error updating project' });
        }),
      ),
    { dispatch: false },
  );

  deleteProjectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectsActions.deleteProjectByIdSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Project deleted successfully' });
        }),
      ),
    { dispatch: false },
  );

  deleteProjectFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProjectsActions.deleteProjectByIdFailure),
        map(() => {
          this.messageService.add({ severity: 'error', summary: 'Error deleting project' });
        }),
      ),
    { dispatch: false },
  );
}
