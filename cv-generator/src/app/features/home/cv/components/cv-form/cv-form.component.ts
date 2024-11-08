import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { Employee } from '../../../employees/models/employee.model';
import * as EmployeeActions from '../../../employees/store/employees.actions';
import { selectCurrentEmployee } from '../../../employees/store/employees.selectors';
import { CV } from '../../models/cv.model';
import { RouterLink } from '@angular/router';
import { ChipsModule } from 'primeng/chips';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, RouterLink, ChipsModule],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.scss',
})
export class CvFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() cv!: CV;
  @Input() employeeId!: string | undefined;
  @Input() isReadOnly = false;
  @Output() formCreateCv = new EventEmitter<CV>();

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
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
      skills: [[], Validators.required],
      description: [''],
    });

    // Disable form until employeeId is available
    this.cvForm.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cv'] && !changes['cv'].firstChange) {
      //TODO: Update the form with the current cv data
    }

    if (changes['employeeId'] && !changes['employeeId'].firstChange) {
      // Enable form when employeeId is set
      this.cvForm.enable();
      // Keep specific fields disabled
      this.cvForm.get('firstName')?.disable();
      this.cvForm.get('lastName')?.disable();
      this.cvForm.get('email')?.disable();

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

  onCreateCv() {
    if (this.cvForm.valid) {
      const cv = this.getCvData();
      this.formCreateCv.emit(cv);
    }
  }

  private getCvData(): CV {
    return {
      _id: this.cvForm.get('_id')?.value,
      employeeId: this.employeeId || this.cvForm.get('employeeId')?.value,
      name: this.cvForm.get('name')?.value,
      description: this.cvForm.get('description')?.value,
      department: this.cvForm.get('department')?.value,
      specialization: this.cvForm.get('specialization')?.value,
      skills: this.cvForm.get('skills')?.value,
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
