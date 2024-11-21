import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, ChipsModule, CalendarModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit {
  projectForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      _id: [null],
      name: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null],
      teamSize: [null, Validators.required],
      techStack: [[], Validators.required],
      roles: [[], Validators.required],
      description: [''],
      responsibilities: [''],
    });
  }

  onSubmit() {}
}
