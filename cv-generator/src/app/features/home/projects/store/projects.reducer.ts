import { createReducer, on } from '@ngrx/store';
import { ProjectsState, initialState } from './projects.state';
import { deleteProjectByIdSuccess, getAllProjectsSuccess } from './projects.actions';

export const projectsReducer = createReducer<ProjectsState>(
  initialState,

  on(
    getAllProjectsSuccess,
    (state, { projects }): ProjectsState => ({
      ...state,
      projects,
    }),
  ),

  on(
    deleteProjectByIdSuccess,
    (state, { id }): ProjectsState => ({
      ...state,
      projects: state.projects.filter((project) => project._id !== id),
    }),
  ),
);
