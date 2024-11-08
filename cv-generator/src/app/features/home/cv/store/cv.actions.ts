import { createAction, props } from '@ngrx/store';
import { CV } from '../models/cv.model';

export const getAllCv = createAction('[CV] Get All Cv', props<{ employeeId: string }>());
export const getAllCvSuccess = createAction('[CV] Get All Cv (Success)', props<{ cvs: CV[] }>());
export const getAllCvFailure = createAction('[CV] Get All Cv (Failure)', props<{ error: any }>());

export const deleteCvById = createAction('[CV] Delete Cv by ID', props<{ id: string }>());
export const deleteCvByIdSuccess = createAction('[CV] Delete Cv by ID (Success)', props<{ id: string }>());
export const deleteCvByIdFailure = createAction('[CV] Delete Cv by ID (Failure)', props<{ error: any }>());

export const createCv = createAction('[CV] Create Cv', props<{ cv: CV }>());
export const createCvSuccess = createAction('[CV] Create Cv (Success)', props<{ cv: CV }>());
export const createCvFailure = createAction('[CV] Create Cv (Failure)', props<{ error: any }>());
