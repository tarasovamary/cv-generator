
import { Project } from '../models/project.model';

export interface ProjectsState {
  projects: Project[];
}

export const initialState: ProjectsState = {
  projects: [],
};
