import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
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

  getCvById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.getCvById),
      mergeMap((action) =>
        this.cvService.getCvById(action.id).pipe(
          map((response) => {
            return CvActions.getCvByIdSuccess({ cv: response });
          }),
          catchError((error) => of(CvActions.getCvByIdFailure({ error }))),
        ),
      ),
    );
  });

  deleteCvById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.deleteCvById),
      mergeMap((action) =>
        this.cvService.deleteCvById(action.id).pipe(
          map(() => {
            return CvActions.deleteCvByIdSuccess({ id: action.id });
          }),
          catchError((error) => of(CvActions.deleteCvByIdFailure({ error }))),
        ),
      ),
    );
  });

  createCv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.createCv),
      mergeMap((action) =>
        this.cvService.createCv(action.cv).pipe(
          map((response) => {
            return CvActions.createCvSuccess({ cv: response });
          }),
          catchError((error) => of(CvActions.createCvFailure({ error }))),
        ),
      ),
    );
  });

  updateCv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.updateCv),
      mergeMap(({ id, payload }) =>
        this.cvService.updateCv(id, payload).pipe(
          map((response) => {
            return CvActions.updateCvSuccess({ cv: response });
          }),
          catchError((error) => of(CvActions.updateCvFailure({ error }))),
        ),
      ),
    );
  });

  // -----------------------------------------------------------------------------------------------------
  // @ Notifications
  // -----------------------------------------------------------------------------------------------------

  createCvSuccessAlert$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.createCvSuccess),
        tap(() => {
          alert('CV was successfully created!');
        }),
      ),
    { dispatch: false },
  );

  deleteCvByIdSuccessAlert$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.deleteCvByIdSuccess),
        tap(() => {
          alert('CV was successfully deleted!');
        }),
      ),
    { dispatch: false },
  );

  updateCvSuccessAlert$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.updateCvSuccess),
        tap(() => {
          alert('CV was successfully updated!');
        }),
      ),
    { dispatch: false },
  );
}
