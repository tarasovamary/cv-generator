import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import * as EmployeesActions from '../../store/employees.actions';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [NgIf, NgClass, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.store.dispatch(EmployeesActions.createEmployee({ employee: this.employeeForm.value }));
    }
  }

  onCancel() {
    this.router.navigate(['../']);
  }
}
