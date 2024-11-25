import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectsState } from './projects.state';

export const getProjectsState = createFeatureSelector<ProjectsState>('PROJECTS');

export const selectAllProjects = createSelector(getProjectsState, (state) => state.projects);

export const selectProjectId = createSelector(getProjectsState, (state) => state.currentProject?._id);

export const selectCurrentProject = createSelector(getProjectsState, (state) => state.currentProject);
