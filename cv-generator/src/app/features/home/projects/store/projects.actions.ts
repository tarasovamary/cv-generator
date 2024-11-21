import { createAction, props } from '@ngrx/store';
import { Project } from '../models/project.model';

export const getAllProjects = createAction('[PROJECTS] Get All Projects');
export const getAllProjectsSuccess = createAction(
  '[PROJECTS] Get All Projects (Success)',
  props<{ projects: Project[] }>(),
);
export const getAllProjectsFailure = createAction('[PROJECTS] Get All Projects (Failure)', props<{ error: any }>());

export const createProject = createAction('[PROJECTS] Create Project', props<{ project: Project }>());
export const createProjectSuccess = createAction('[PROJECTS] Create Project (Success)', props<{ project: Project }>());
export const createProjectFailure = createAction('[PROJECTS] Create Project (Failure)', props<{ error: any }>());

export const updateProject = createAction(
  '[PROJECTS] Update Project',
  props<{ id: string; payload: Partial<Project> }>(),
);
export const updateProjectSuccess = createAction('[PROJECTS] Update Project (Success)', props<{ project: Project }>());
export const updateProjectFailure = createAction('[PROJECTS] Update Project (Failure)', props<{ error: any }>());

export const deleteProjectById = createAction('[PROJECTS] Delete Project by ID', props<{ id: string }>());
export const deleteProjectByIdSuccess = createAction(
  '[PROJECTS] Delete Project by ID (Success)',
  props<{ id: string }>(),
);
export const deleteProjectByIdFailure = createAction(
  '[PROJECTS] Delete Project by ID (Failure)',
  props<{ error: any }>(),
);
