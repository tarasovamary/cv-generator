import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectsState } from "./projects.state";

export const getProjectsState = createFeatureSelector<ProjectsState>('PROJECTS');

export const selectAllProjects = createSelector(getProjectsState, (state) => state.projects);
