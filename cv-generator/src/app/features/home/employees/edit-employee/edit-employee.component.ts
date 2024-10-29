import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import { Employee } from '../../../../core/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as EmployeesActions from '../../../../core/store/employees/employees.actions';
import { selectEmployee } from '../../../../core/store/employees/employees.selectors';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, NgForOf],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {
  activeTab: string = 'info';
  employeeForm!: UntypedFormGroup;
  employeeId!: string;
  employee$!: Observable<Employee | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(EmployeesActions.getEmployeeById({ id: this.employeeId }));

    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
    });

    this.loadEmployeeData();
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.store.dispatch(
        EmployeesActions.updateEmployee({
          id: this.employeeId,
          payload: this.employeeForm.value, //TODO: only changed fields
        }),
      );
      this.onUpdateSuccess();
    }
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  private loadEmployeeData() {
    this.employee$ = this.store.pipe(select(selectEmployee));

    this.employee$
      .pipe(
        takeUntil(this.destroy$),
        filter((response) => Boolean(response)),
        tap((response) => {
          if (response) {
            this.employeeForm.patchValue(response);
          }
        }),
      )
      .subscribe();
  }

  private onUpdateSuccess(): void {
    this.actions$
      .pipe(ofType(EmployeesActions.updateEmployeeSuccess), takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['../']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
