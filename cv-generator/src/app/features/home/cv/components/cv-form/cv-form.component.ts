import { NgClass } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { Employee } from '../../../employees/models/employee.model';
import * as EmployeeActions from '../../../employees/store/employees.actions';
import { selectCurrentEmployee } from '../../../employees/store/employees.selectors';
import { CV } from '../../models/cv.model';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.scss',
})
export class CvFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() cv!: CV;
  @Input() employeeId!: string | undefined;
  @Input() isReadOnly = false;

  cvForm!: UntypedFormGroup;

  employee$!: Observable<Employee | null>;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.cvForm = this.fb.group({
      _id: null,
      employeeId: null,
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
      skills: ['', Validators.required],
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cv'] && !changes['cv'].firstChange) {
      //TODO: Update the form with the current cv data
    }

    if (changes['employeeId'] && !changes['employeeId'].firstChange) {
      // Load employee and update the form with new employee
      let employeeId = changes['employeeId'].currentValue;
      this.loadEmployeeData(employeeId);
    }
  }

  updateCvForm() {}

  loadEmployeeData(employeeId: string) {
    this.store.dispatch(EmployeeActions.getEmployeeById({ id: employeeId }));
    this.employee$ = this.store.select(selectCurrentEmployee);

    // Patch the form with employee data
    this.employee$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((employee) => {
          this.cvForm.patchValue({
            employeeId: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            specialization: employee.specialization,
            department: employee.department,
          });
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
