import { CV } from '../../models/cv.model';

export interface CvState {
  cvs: CV[];
}

export const initialState: CvState = {
  cvs: [],
};
