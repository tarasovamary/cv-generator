import { NgClass } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subject, defer, filter, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { Employee } from '../../../employees/models/employee.model';
import * as EmployeeActions from '../../../employees/store/employees.actions';
import { selectCurrentEmployee } from '../../../employees/store/employees.selectors';
import { CV } from '../../models/cv.model';
import { ChipsModule } from 'primeng/chips';
import * as CvActions from '../../../cv/store/cv.actions';
import { selectCurrentCv, selectCvId } from '../../store/cv.selectors';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, ChipsModule],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.scss',
})
export class CvFormComponent implements OnInit, OnDestroy, OnChanges {
  // Input/Output
  @Input() cvId: string;
  @Input() employeeId: string;
  @Input() isReadOnly = false;

  // Form
  cvForm!: UntypedFormGroup;

  // Observables
  employee$: Observable<Employee>;
  cv$: Observable<CV>;
  cvId$: Observable<string>;

  // Subjects
  private destroy$ = new Subject<void>();
  private submitCvForm = new ReplaySubject<FormGroup>(1);

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.cvId$ = this.store.select(selectCvId);

    this.cvForm = this.fb.group({
      _id: [null],
      employeeId: [null],
      name: ['', Validators.required],
      firstName: [null, Validators.required],
      lastName: [{ value: null, disabled: true }, Validators.required],
      email: [{ value: null, disabled: true }, [Validators.required, Validators.email]],
      specialization: [null, Validators.required],
      department: [null, Validators.required],
      skills: [[], Validators.required],
      description: [''],
    });

    // Disable form until form gets data
    this.cvForm.disable();

    // Submit form depends on cvId
    this.submitCvForm
      .pipe(
        takeUntil(this.destroy$),
        filter((cvForm) => cvForm.valid),
        map((cvForm) => cvForm.value),
        switchMap((value: any) =>
          this.cvId$.pipe(
            take(1),
            switchMap((cvId) =>
              defer(() =>
                cvId
                  ? of(this.store.dispatch(CvActions.updateCv({ id: cvId, payload: value })))
                  : of(this.store.dispatch(CvActions.createCv({ cv: value }))),
              ),
            ),
          ),
        ),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cvId'] && changes['cvId'].currentValue) {
      // If CV data changes, load CV and employee details
      this.loadCvData(changes['cvId'].currentValue);
    }

    if (changes['employeeId'] && !changes['employeeId'].firstChange) {
      // If employee data changes, enable the form and load employee details
      this.loadEmployeeData(changes['employeeId'].currentValue);
    }
  }

  onSubmit() {
    this.submitCvForm.next(this.cvForm);
  }

  private loadCvData(cvId: string): void {
    this.store.dispatch(CvActions.getCvById({ id: cvId }));
    this.cv$ = this.store.select(selectCurrentCv);

    this.cv$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((cv) => this.patchCvForm(cv)),
      )
      .subscribe();
  }

  private patchCvForm(cv: CV): void {
    if (cv.employeeId) {
      this.loadEmployeeData(cv.employeeId); // Load employee data based on employeeId from CV
    }

    if (this.cvForm) {
      this.enableForm();

      this.cvForm.patchValue({
        _id: cv._id,
        name: cv.name,
        employeeId: cv.employeeId,
        specialization: cv.specialization,
        department: cv.department,
        skills: cv.skills,
        description: cv.description,
      });
    }
  }

  private enableForm() {
    this.cvForm.enable();

    this.cvForm.get('firstName')?.disable();
    this.cvForm.get('lastName')?.disable();
    this.cvForm.get('email')?.disable();
  }

  private loadEmployeeData(employeeId: string): void {
    this.store.dispatch(EmployeeActions.getEmployeeById({ id: employeeId }));
    this.employee$ = this.store.select(selectCurrentEmployee);

    this.employee$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((employee) => this.patchEmployeeForm(employee)),
      )
      .subscribe();
  }

  private patchEmployeeForm(employee: Employee): void {
    const value: any = {
      employeeId: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
    };

    if (!this.cvId) {
      this.cvForm.reset(); // Reset form when we select another employee

      value.specialization = employee.specialization;
      value.department = employee.department;
    }

    if (this.cvForm) {
      this.enableForm();
      this.cvForm.patchValue(value);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
