import { createReducer, on } from '@ngrx/store';
import { EmployeesState, initialState } from './employees.state';
import {
  createEmployeeSuccess,
  deleteEmployeeSuccess,
  getAllEmployeesSuccess,
  getEmployeeByIdSuccess,
  resetCurrentEmployee,
} from './employees.actions';

export const employeesReducer = createReducer<EmployeesState>(
  initialState,

  on(
    getAllEmployeesSuccess,
    (state, { employees }): EmployeesState => ({
      ...state,
      employees,
    }),
  ),

  on(
    getEmployeeByIdSuccess,
    (state, { employee }): EmployeesState => ({
      ...state,
      currentEmployee: employee,
    }),
  ),

  on(
    createEmployeeSuccess,
    (state, { employee }): EmployeesState => ({
      ...state,
      employees: [...state.employees, employee],
    }),
  ),

  on(
    resetCurrentEmployee,
    (state): EmployeesState => ({
      ...state,
      currentEmployee: null,
    }),
  ),
);
