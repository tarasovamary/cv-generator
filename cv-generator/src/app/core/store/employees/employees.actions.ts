import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

export const getAllEmployees = createAction('[Employees] Get All Employees');
export const getAllEmployeesSuccess = createAction(
  '[Employees] Get All Employees (Success)',
  props<{ employees: Employee[] }>(),
);
export const getAllEmployeesFailure = createAction('[Employees] Get All Employees (Failure)', props<{ error: any }>());

export const getEmployeeById = createAction('[Employees] Get Employee by ID', props<{ id: string }>());
export const getEmployeeByIdSuccess = createAction(
  '[Employees] Get Employee by ID (Success)',
  props<{ employee: Employee }>(),
);
export const getEmployeeByIdFailure = createAction('[Employees] Get Employee by ID (Failure)', props<{ error: any }>());

export const createEmployee = createAction('[Employees] Create Employee', props<{ employee: Employee }>());
export const createEmployeeSuccess = createAction(
  '[Employees] Create Employee (Success)',
  props<{ employee: Employee }>(),
);
export const createEmployeeFailure = createAction('[Employees] Create Employee (Failure)', props<{ error: any }>());

export const updateEmployee = createAction(
  '[Employees] Update Employee',
  props<{ id: string; payload: Partial<Employee> }>(),
);
export const updateEmployeeSuccess = createAction(
  '[Employees] Update Employee (Success)',
  props<{ employee: Employee }>(),
);
export const updateEmployeeFailure = createAction('[Employees] Update Employee (Failure)', props<{ error: any }>());

export const deleteEmployee = createAction('[Employees] Delete Employee', props<{ id: string }>());
export const deleteEmployeeSuccess = createAction('[Employees] Delete Employee (Success)', props<{ id: string }>());
export const deleteEmployeeFailure = createAction('[Employees] Delete Employee (Failure)', props<{ error: string }>());
