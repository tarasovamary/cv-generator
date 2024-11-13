import { CV } from '../models/cv.model';

export interface CvState {
  cvs: CV[];
  currentCv: CV | null;
}

export const initialState: CvState = {
  cvs: [],
  currentCv: null,
};
