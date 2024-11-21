import { createAction, props } from "@ngrx/store";
import { Project } from "../models/project.model";

export const getAllProjects = createAction('[PROJECTS] Get All Projects');
export const getAllProjectsSuccess = createAction('[PROJECTS] Get All Projects (Success)', props<{ projects: Project[] }>());
export const getAllProjectsFailure = createAction('[PROJECTS] Get All Projects (Failure)', props<{ error: any }>());
