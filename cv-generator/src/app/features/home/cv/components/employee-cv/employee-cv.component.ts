import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { CV } from '../../models/cv.model';
import * as CvActions from '../../store/cv.actions';
import * as EmployeeActions from '../../../employees/store/employees.actions';
import { selectAllCv } from '../../store/cv.selectors';
import { RouterLink } from '@angular/router';
import { Employee } from '../../../employees/models/employee.model';
import { selectCurrentEmployee } from '../../../employees/store/employees.selectors';

@Component({
  selector: 'app-employee-cv',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
})
export class EmployeeCvComponent implements OnInit, OnDestroy {
  @Input({ required: true }) employeeId!: string;

  activeCvId!: string;
  cvForm!: UntypedFormGroup;

  cvs$!: Observable<CV[]>;
  employee$!: Observable<Employee | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CvActions.getAllCv({ employeeId: this.employeeId }));
    this.store.dispatch(EmployeeActions.getEmployeeById({ id: this.employeeId }));

    this.cvs$ = this.store.select(selectAllCv);
    this.employee$ = this.store.select(selectCurrentEmployee);

    this.cvForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
      skills: ['', Validators.required],
      description: [''],
    });

    // Set the first CV as active
    this.cvs$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((cvs) => {
          if (cvs.length > 0) {
            this.setActiveCv(cvs[0]);
          }
        }),
      )
      .subscribe();

    // Update CV form with employee info
    this.employee$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((employee) => {
          this.cvForm.patchValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
          });
        }),
      )
      .subscribe();
  }

  onDeleteCv(id: string) {}

  onSubmit() {}

  onCancel() {}

  setActiveCv(cv: CV) {
    this.activeCvId = cv._id;

    this.cvForm.patchValue(cv);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
