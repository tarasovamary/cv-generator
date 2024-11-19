import { Employee } from '../../employees/models/employee.model';
import { CV } from '../models/cv.model';

export interface CvState {
  cvs: CV[];
  currentCv: CV | null;
  employees: Employee[];
  selectedEmployee: Employee | null;
}

export const initialState: CvState = {
  cvs: [],
  currentCv: null,
  employees: [],
  selectedEmployee: null,
};
