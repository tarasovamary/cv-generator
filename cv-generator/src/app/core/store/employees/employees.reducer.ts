import { createReducer, on } from '@ngrx/store';
import { EmployeesState, initialState } from './employees.state';
import {
  createEmployeeSuccess,
  deleteEmployeeSuccess,
  getAllEmployeesSuccess,
  getEmployeeByIdSuccess,
} from './employees.actions';
import { state } from '@angular/animations';

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
    deleteEmployeeSuccess,
    (state, { id }): EmployeesState => ({
      ...state,
      employees: state.employees.filter((employee) => employee._id !== id),
    }),
  ),
);
