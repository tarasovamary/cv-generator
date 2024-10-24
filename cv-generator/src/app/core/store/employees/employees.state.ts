import { Employee } from '../../models/employee.model';

export interface EmployeesState {
  employees: Employee[];
  currentEmployee: Employee | null;
}

export const initialState: EmployeesState = {
  employees: [],
  currentEmployee: null,
};
