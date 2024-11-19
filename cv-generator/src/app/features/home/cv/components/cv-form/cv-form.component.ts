import { NgClass } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ChipsModule } from 'primeng/chips';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  defer,
  filter,
  map,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import * as CvActions from '../../../cv/store/cv.actions';
import { Employee } from '../../../employees/models/employee.model';
import { CV } from '../../models/cv.model';
import { selectCurrentCv, selectCvId, selectSelectedEmployee } from '../../store/cv.selectors';

export interface InitialCvFormState {
  entityId?: string;
  entityType: 'cv' | 'employee';
}

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, ChipsModule],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.scss',
})
export class CvFormComponent implements OnInit, OnDestroy {
  @Input() set state(value: InitialCvFormState) {
    this._state$.next(value);
  }

  private _state$ = new BehaviorSubject<InitialCvFormState | null>(null);

  // Form
  cvForm!: UntypedFormGroup;
  employeeForm!: UntypedFormGroup;

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

    this.employeeForm = this.fb.group({
      firstName: [{ value: null, disabled: true }, Validators.required],
      lastName: [{ value: null, disabled: true }, Validators.required],
      email: [{ value: null, disabled: true }, [Validators.required, Validators.email]],
    });

    this.cvForm = this.fb.group({
      _id: [null],
      employeeId: [null],
      name: ['', Validators.required],
      specialization: [null, Validators.required],
      department: [null, Validators.required],
      skills: [[], Validators.required],
      description: [''],
    });

    this._state$
      .pipe(
        takeUntil(this.destroy$),
        filter((state) => !!state),
        tap((state) => this.loadEntityData(state)),
      )
      .subscribe();

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

  onSubmit() {
    this.submitCvForm.next(this.cvForm);
  }

  private loadEntityData(state: InitialCvFormState): void {
    if (state.entityType === 'cv') {
      this.loadCvData(state.entityId);
    } else if (state.entityType === 'employee') {
      this.loadEmployeeData(state.entityId);
    }
  }

  private loadCvData(cvId: string): void {
    this.store.dispatch(CvActions.getCvById({ id: cvId }));

    this.cv$ = this.store.select(selectCurrentCv);
    this.cv$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((cv) => this.cvForm.patchValue(cv)),
        tap((cv) => this.loadEmployeeData(cv.employeeId)), //* Loading employee data by employeeId
      )
      .subscribe();

    // Enable form
    this.cvForm.enable();
  }

  private loadEmployeeData(employeeId: string): void {
    this.store.dispatch(CvActions.setSelectedEmployee({ id: employeeId }));

    this.employee$ = this.store.select(selectSelectedEmployee);
    this.employee$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((employee) => {
          this.employeeForm.patchValue(employee);
          this.cvForm.patchValue({
            employeeId: employee._id,
            specialization: employee.specialization,
            department: employee.department,
          });
        }),
      )
      .subscribe();

    // Enable form
    this.cvForm.enable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
