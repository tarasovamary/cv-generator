import { NgClass } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../employees/models/employee.model';
import { CV } from '../../models/cv.model';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.scss',
})
export class CvFormComponent {
  @Input() initialData!: Employee;
  @Input() isReadOnly = false;
  cvForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && !changes['initialData'].firstChange) {
      // Update the form with new initial data
      this.updateCvForm();
    }
  }

  updateCvForm() {
    if (this.cvForm) {
      // Patch the form with new data
      this.cvForm.patchValue({
        firstName: this.initialData?.firstName || '',
        lastName: this.initialData?.lastName || '',
        email: this.initialData?.email || '',
        specialization: this.initialData?.specialization || '',
        department: this.initialData?.department || '',
      });
    }
  }
}
