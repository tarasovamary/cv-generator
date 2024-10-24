import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import * as EmployeesActions from './employees.actions';
import { EmployeesService } from '../../services/employees.service';

@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService,
  ) {}

  getAllEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesActions.getAllEmployees),
      mergeMap((action) =>
        this.employeesService.getAllEmployees().pipe(
          map((response) => {
            return EmployeesActions.getAllEmployeesSuccess({ employees: response });
          }),
          catchError((error) => of(EmployeesActions.getAllEmployeesFailure({ error }))),
        ),
      ),
    );
  });

  getEmployeeById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesActions.getEmployeeById),
      mergeMap((action) =>
        this.employeesService.getEmployeeById(action.id).pipe(
          map((response) => {
            return EmployeesActions.getEmployeeByIdSuccess({ employee: response });
          }),
          catchError((error) => of(EmployeesActions.getEmployeeByIdFailure({ error }))),
        ),
      ),
    );
  });

  createEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesActions.createEmployee),
      mergeMap((action) =>
        this.employeesService.createEmployee(action.employee).pipe(
          map((response) => {
            return EmployeesActions.createEmployeeSuccess({ employee: response });
          }),
          catchError((error) => of(EmployeesActions.createEmployeeFailure({ error }))),
        ),
      ),
    );
  });

  updateEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesActions.updateEmployee),
      mergeMap(({ id, payload }) =>
        this.employeesService.updateEmployee(id, payload).pipe(
          map((response) => {
            return EmployeesActions.updateEmployeeSuccess({ employee: response });
          }),
          catchError((error) => of(EmployeesActions.updateEmployeeFailure({ error }))),
        ),
      ),
    );
  });

  deleteEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeesActions.deleteEmployee),
      mergeMap((action) =>
        this.employeesService.deleteEmployee(action.id).pipe(
          map(() => {
            return EmployeesActions.deleteEmployeeSuccess({ id: action.id });
          }),
          catchError((error) => of(EmployeesActions.deleteEmployeeFailure({ error }))),
        ),
      ),
    );
  });
}
