import { createAction, props } from '@ngrx/store';
import { Employee } from '../../employees/models/employee.model';
import { CV } from '../models/cv.model';
import { Project } from '../../projects/models/project.model';
export const getAllCvs = createAction('[CV] Get All Cvs');
export const getAllCvsSuccess = createAction('[CV] Get All Cvs (Success)', props<{ cvs: CV[] }>());
export const getAllCvsFailure = createAction('[CV] Get All Cvs (Failure)', props<{ error: any }>());

export const getAllCvForEmployee = createAction('[CV] Get All Cv for Employee', props<{ employeeId: string }>());
export const getAllCvForEmployeeSuccess = createAction(
  '[CV] Get All Cv for Employee (Success)',
  props<{ cvs: CV[] }>(),
);
export const getAllCvForEmployeeFailure = createAction(
  '[CV] Get All Cv for Employee (Failure)',
  props<{ error: any }>(),
);

export const getCvById = createAction('[CV] Get Cv by ID', props<{ id: string }>());
export const getCvByIdSuccess = createAction('[CV] Get Cv by ID (Success)', props<{ cv: CV }>());
export const getCvByIdFailure = createAction('[CV] Get Cv by ID (Failure)', props<{ error: any }>());

export const deleteCvById = createAction('[CV] Delete Cv by ID', props<{ id: string }>());
export const deleteCvByIdSuccess = createAction('[CV] Delete Cv by ID (Success)', props<{ id: string }>());
export const deleteCvByIdFailure = createAction('[CV] Delete Cv by ID (Failure)', props<{ error: any }>());

export const createCv = createAction('[CV] Create Cv', props<{ cv: CV }>());
export const createCvSuccess = createAction('[CV] Create Cv (Success)', props<{ cv: CV }>());
export const createCvFailure = createAction('[CV] Create Cv (Failure)', props<{ error: any }>());

export const updateCv = createAction('[CV] Update Cv', props<{ id: string; payload: Partial<CV> }>());
export const updateCvSuccess = createAction('[CV] Update Cv (Success)', props<{ cv: CV }>());
export const updateCvFailure = createAction('[CV] Update Cv (Failure)', props<{ error: any }>());

export const resetCurrentCv = createAction('[CV] Reset Current CV');

export const getAllCvEmployees = createAction('[CV] Get All Employees');
export const getAllCvEmployeesSuccess = createAction(
  '[CV] Get All Employees (Success)',
  props<{ employees: Employee[] }>(),
);
export const getAllCvEmployeesFailure = createAction('[CV] Get All Employees (Failure)', props<{ error: any }>());

export const setSelectedEmployee = createAction('[CV] Set Selected Employee', props<{ id: string }>());

export const getAllProjects = createAction('[CV] Get All Projects');
export const getAllProjectsSuccess = createAction('[CV] Get All Projects (Success)', props<{ projects: Project[] }>());
export const getAllProjectsFailure = createAction('[CV] Get All Projects (Failure)', props<{ error: any }>());
