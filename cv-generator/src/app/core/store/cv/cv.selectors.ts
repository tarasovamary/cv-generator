import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CvState } from './cv.state';

export const getCvState = createFeatureSelector<CvState>('CV');

export const selectAllCv = createSelector(getCvState, (state) => state.cvs);
