import { createReducer, on } from '@ngrx/store';
import { createCvSuccess, deleteCvByIdSuccess, getAllCvSuccess, getCvByIdSuccess } from './cv.actions';
import { CvState, initialState } from './cv.state';

export const cvReducer = createReducer<CvState>(
  initialState,

  on(
    getAllCvSuccess,
    (state, { cvs }): CvState => ({
      ...state,
      cvs,
    }),
  ),

  on(
    getCvByIdSuccess,
    (state, { cv }): CvState => ({
      ...state,
      currentCv: cv,
    }),
  ),

  on(
    deleteCvByIdSuccess,
    (state, { id }): CvState => ({
      ...state,
      cvs: state.cvs.filter((cv) => cv._id !== id),
    }),
  ),

  on(
    createCvSuccess,
    (state, { cv }): CvState => ({
      ...state,
      cvs: [...state.cvs, cv],
    }),
  ),
);
