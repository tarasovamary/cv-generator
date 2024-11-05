import { NgClass, NgIf, NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, NgForOf],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() initialData!: Employee;
  @Output() formSubmit = new EventEmitter<Employee>();
  @Output() formCancel = new EventEmitter<void>();

  employeeForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: [this.initialData?.firstName || '', Validators.required],
      lastName: [this.initialData?.lastName || '', Validators.required],
      email: [this.initialData?.email || '', [Validators.required, Validators.email]],
      specialization: [this.initialData?.specialization || '', Validators.required],
      department: [this.initialData?.department || '', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && !changes['initialData'].firstChange) {
      // Update the form with new initial data
      this.updateEmployeeForm();
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.formSubmit.emit(this.employeeForm.value);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  updateEmployeeForm() {
    if (this.employeeForm) {
      // Patch the form with new data
      this.employeeForm.patchValue({
        firstName: this.initialData?.firstName || '',
        lastName: this.initialData?.lastName || '',
        email: this.initialData?.email || '',
        specialization: this.initialData?.specialization || '',
        department: this.initialData?.department || '',
      });
    }
  }
}
