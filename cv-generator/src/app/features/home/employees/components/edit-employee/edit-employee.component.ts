import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { EmployeeCvComponent } from '../../../cv/components/employee-cv/employee-cv.component';
import { Employee } from '../../models/employee.model';
import * as EmployeesActions from '../../store/employees.actions';
import { selectCurrentEmployee } from '../../store/employees.selectors';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, NgForOf, EmployeeCvComponent],
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
    }
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  private loadEmployeeData() {
    this.employee$ = this.store.pipe(select(selectCurrentEmployee));

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
