import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { EmployeesService } from '../services/employees.service';
import * as EmployeesActions from './employees.actions';
import { MessageService } from 'primeng/api';

@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService,
    private router: Router,
    private messageService: MessageService,
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
            //@ts-ignore
            return EmployeesActions.getEmployeeByIdSuccess({ employee: response.employee });
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

  redirectToBack$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EmployeesActions.updateEmployeeSuccess, EmployeesActions.createEmployeeSuccess),
        tap(() => {
          this.router.navigate(['../']);
        }),
      );
    },
    { dispatch: false },
  );

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

  // -----------------------------------------------------------------------------------------------------
  // @ Notifications
  // -----------------------------------------------------------------------------------------------------

  createEmployeeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.createEmployeeSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Employee created successfully' });
        }),
      ),
    { dispatch: false },
  );

  createEmployeeFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.createEmployeeFailure),
        map(() => {
          this.messageService.add({ severity: 'error', summary: 'Error creating employee' });
        }),
      ),
    { dispatch: false },
  );

  updateEmployeeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.updateEmployeeSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Employee updated successfully' });
        }),
      ),
    { dispatch: false },
  );

  updateEmployeeFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.updateEmployeeFailure),
        map(() => {
          this.messageService.add({ severity: 'error', summary: 'Error updating employee' });
        }),
      ),
    { dispatch: false },
  );

  deleteEmployeeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.deleteEmployeeSuccess),
        map(() => {
          this.messageService.add({ severity: 'success', summary: 'Employee deleted successfully' });
        }),
      ),
    { dispatch: false },
  );

  deleteEmployeeFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.deleteEmployeeFailure),
        map(({ error }) => {
          this.messageService.add({ severity: 'error', summary: 'Error deleting employee', detail: error });
        }),
      ),
    { dispatch: false },
  );
}
