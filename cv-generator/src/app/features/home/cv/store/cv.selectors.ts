import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CvState } from './cv.state';

export const getCvState = createFeatureSelector<CvState>('CV');

export const selectAllCv = createSelector(getCvState, (state) => state.cvs);

export const selectCurrentCv = createSelector(getCvState, (state) => state.currentCv);

export const selectCvId = createSelector(getCvState, (state) => state.currentCv?._id);
