import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeesState } from './employees.state';

export const getEmployeesState = createFeatureSelector<EmployeesState>('EMPLOYEES');

export const selectAllEmployees = createSelector(getEmployeesState, (state) => state.employees);

export const selectEmployee = createSelector(getEmployeesState, (state) => state.currentEmployee);

export const selectEmployeeById = (id: string) =>
  createSelector(getEmployeesState, (state) => state.employees.find((employee) => employee._id === id));
