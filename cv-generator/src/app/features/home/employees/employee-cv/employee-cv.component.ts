import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CV } from '../../../../core/models/cv.model';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as CvActions from '../../../../core/store/cv/cv.actions';

@Component({
  selector: 'app-employee-cv',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
})
export class EmployeeCvComponent {
  cvList: CV[] = [];
  cvForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CvActions.getAllCv({ employeeId: '671b63914aa1dd9c9655a858' }));

    this.cvList = [];

    this.cvForm = this.fb.group({
      cvName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
      skills: ['', Validators.required],
      description: [''],
    });
  }

  onDeleteCv(id: string) {}

  onSubmit() {}

  onCancel() {}
}
