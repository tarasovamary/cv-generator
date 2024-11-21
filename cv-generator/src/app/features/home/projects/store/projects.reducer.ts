import { createReducer, on } from '@ngrx/store';
import { ProjectsState, initialState } from './projects.state';
import { createProjectSuccess, deleteProjectByIdSuccess, getAllProjectsSuccess, updateProjectSuccess } from './projects.actions';

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
    createProjectSuccess,
    (state, { project }): ProjectsState => ({
      ...state,
      projects: [...state.projects, project],
    }),
  ),

  on(
    deleteProjectByIdSuccess,
    (state, { id }): ProjectsState => ({
      ...state,
      projects: state.projects.filter((project) => project._id !== id),
    }),
  ),
  
  on(
    updateProjectSuccess,
    (state, { project }): ProjectsState => ({
      ...state,
      projects: state.projects.map((updatingProject) => updatingProject._id !== project._id ? project : updatingProject),
    })
  )
);
