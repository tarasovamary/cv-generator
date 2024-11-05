import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import * as EmployeesActions from '../../store/employees.actions';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [NgIf, NgClass, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, EmployeeFormComponent],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
})
export class CreateEmployeeComponent {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  onSubmit(employeeData: Employee) {
    this.store.dispatch(EmployeesActions.createEmployee({ employee: employeeData }));
  }

  onCancel() {
    this.router.navigate(['../']);
  }
}
