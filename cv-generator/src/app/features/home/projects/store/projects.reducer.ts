import { createReducer, on } from "@ngrx/store";
import { ProjectsState, initialState } from "./projects.state";
import { getAllProjectsSuccess } from "./projects.actions";

export const projectsReducer = createReducer<ProjectsState>(
    initialState,
  
    on(
      getAllProjectsSuccess,
      (state, { projects }): ProjectsState => ({
        ...state,
        projects,
      }),
    ),
)