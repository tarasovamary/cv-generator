import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

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
      console.log(this.employeeForm.value);
    }
  }

  onCancel() {
    this.router.navigate(['../']);
  }
}
