import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CvService } from '../services/cv.service';
import * as CvActions from '../store/cv.actions';

@Injectable()
export class CvEffects {
  constructor(
    private actions$: Actions,
    private cvService: CvService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  getAllCvs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.getAllCvs),
      mergeMap(() =>
        this.cvService.getAllCvs().pipe(
          map((response) => {
            return CvActions.getAllCvsSuccess({ cvs: response });
          }),
          catchError((error) => of(CvActions.getAllCvsFailure({ error }))),
        ),
      ),
    );
  });

  getAllCvForEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.getAllCvForEmployee),
      mergeMap((action) =>
        this.cvService.getAllCvForEmployee(action.employeeId).pipe(
          map((response) => {
            return CvActions.getAllCvForEmployeeSuccess({ cvs: response });
          }),
          catchError((error) => of(CvActions.getAllCvForEmployeeFailure({ error }))),
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

  getAllCvEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvActions.getAllCvEmployees),
      mergeMap((action) =>
        this.cvService.getAllEmployees().pipe(
          map((response) => {
            return CvActions.getAllCvEmployeesSuccess({ employees: response });
          }),
          catchError((error) => of(CvActions.getAllCvEmployeesFailure({ error }))),
        ),
      ),
    );
  });

  redirectToCv$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CvActions.createCvSuccess, CvActions.updateCvSuccess),
        map((action) => {
          if (action.cv.employeeId) {
            this.router.navigate([`/home/employees/${action.cv.employeeId}/cv`]);
          }
        }),
      );
    },
    { dispatch: false },
  );

  // -----------------------------------------------------------------------------------------------------
  // @ Notifications
  // -----------------------------------------------------------------------------------------------------

  createCvSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.createCvSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Cv created successfully' });
        }),
      ),
    { dispatch: false },
  );

  createCvFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.createCvFailure),
        map(() => {
          this.messageService.add({ severity: 'error', summary: 'Error creating cv' });
        }),
      ),
    { dispatch: false },
  );

  updateCvSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.updateCvSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Cv updated successfully' });
        }),
      ),
    { dispatch: false },
  );

  updateCvFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.updateCvFailure),
        map(() => {
          this.messageService.add({ severity: 'error', summary: 'Error updating cv' });
        }),
      ),
    { dispatch: false },
  );

  deleteCvSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.deleteCvByIdSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Cv deleted successfully' });
        }),
      ),
    { dispatch: false },
  );

  deleteCvFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CvActions.deleteCvByIdFailure),
        map(() => {
          this.messageService.add({ severity: 'error', summary: 'Error deleting cv' });
        }),
      ),
    { dispatch: false },
  );
}
