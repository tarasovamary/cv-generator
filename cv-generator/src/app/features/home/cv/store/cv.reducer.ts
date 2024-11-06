import { createReducer, on } from '@ngrx/store';
import { deleteCvByIdSuccess, getAllCvSuccess } from './cv.actions';
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
    deleteCvByIdSuccess,
    (state, { id }): CvState => ({
      ...state,
      cvs: state.cvs.filter((cv) => cv._id !== id),
    }),
  ),
);
