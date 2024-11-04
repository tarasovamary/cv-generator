import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CvService } from '../services/cv.service';
import * as CvActions from '../store/cv.actions';

@Injectable()
export class CvEffects {
  constructor(
    private actions$: Actions,
    private cvService: CvService,
  ) {}

  getAllCv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.getAllCv),
      mergeMap((action) =>
        this.cvService.getAllCv(action.employeeId).pipe(
          map((response) => {
            return CvActions.getAllCvSuccess({ cvs: response });
          }),
          catchError((error) => of(CvActions.getAllCvFailure({ error }))),
        ),
      ),
    );
  });
}
