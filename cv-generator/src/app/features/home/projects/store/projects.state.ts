import { Project } from '../models/project.model';

export interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
}

export const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
};
