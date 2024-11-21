import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectsService } from "../services/projects.service";
import * as ProjectsActions from '../store/projects.actions';
import { mergeMap, map, catchError, of } from "rxjs";

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

  
  }