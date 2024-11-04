import { createReducer, on } from '@ngrx/store';
import { getAllCvSuccess } from './cv.actions';
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
);
