import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Observable, ReplaySubject, Subject, defer, filter, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectCurrentEmployee, selectEmployeeId } from '../../store/employees.selectors';
import { Router } from '@angular/router';
import * as EmployeesActions from '../../store/employees.actions';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  // Form
  employeeForm!: UntypedFormGroup;

  // Observables
  employee$!: Observable<Employee | null>;
  employeeId$: Observable<string>;

  // Subjects
  private destroy$ = new Subject<void>();
  private submitEmployeeForm = new ReplaySubject<FormGroup>(1);

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.employeeId$ = this.store.select(selectEmployeeId);

    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.employee$ = this.store.pipe(select(selectCurrentEmployee));
    this.employee$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((employee) => this.employeeForm.patchValue(employee)),
      )
      .subscribe();

    this.submitEmployeeForm
      .pipe(
        takeUntil(this.destroy$),
        filter((form) => form.valid),
        map((form) => form.value),
        switchMap((employee) =>
          this.employeeId$.pipe(
            take(1),
            switchMap((id) =>
              defer(() =>
                id
                  ? of(this.store.dispatch(EmployeesActions.updateEmployee({ id, payload: employee })))
                  : of(this.store.dispatch(EmployeesActions.createEmployee({ employee }))),
              ),
            ),
          ),
        ),
      )
      .subscribe();
  }

  onSubmit() {
    this.submitEmployeeForm.next(this.employeeForm);
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
