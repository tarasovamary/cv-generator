import { createAction, props } from '@ngrx/store';
import { CV } from '../models/cv.model';

export const getAllCv = createAction('[CV] Get All Cv', props<{ employeeId: string }>());
export const getAllCvSuccess = createAction('[CV] Get All Cv (Success)', props<{ cvs: CV[] }>());
export const getAllCvFailure = createAction('[CV] Get All Cv (Failure)', props<{ error: any }>());

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
