import { createAction, props } from '@ngrx/store';
import { CV } from '../../models/cv.model';

export const getAllCv = createAction('[CV] Get All Cv', props<{ employeeId: string }>());
export const getAllCvSuccess = createAction('[CV] Get All Cv (Success)', props<{ cvs: CV[] }>());
export const getAllCvFailure = createAction('[CV] Get All Cv (Failure)', props<{ error: any }>());
