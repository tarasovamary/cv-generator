import { Employee } from '../../employees/models/employee.model';
import { Project } from '../../projects/models/project.model';
import { CV } from '../models/cv.model';

export interface CvState {
  cvs: CV[];
  currentCv: CV | null;
  employees: Employee[];
  selectedEmployee: Employee | null;
  projects: Project[];
}

export const initialState: CvState = {
  cvs: [],
  currentCv: null,
  employees: [],
  selectedEmployee: null,
  projects: [],
};
