import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeesState } from './employees.state';

export const getEmployeesState = createFeatureSelector<EmployeesState>('EMPLOYEES');

export const selectAllEmployees = createSelector(getEmployeesState, (state) => state.employees);
