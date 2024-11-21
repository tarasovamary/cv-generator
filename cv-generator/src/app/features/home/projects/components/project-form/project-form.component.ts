import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { Observable, ReplaySubject, Subject, defer, filter, map, of, switchMap, take, takeUntil } from 'rxjs';
import * as ProjectActions from '../../store/projects.actions';
import { selectProjectId } from '../../store/projects.selectors';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, ChipsModule, CalendarModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  // Form
  projectForm: UntypedFormGroup;

  // Observables
  projectId$: Observable<string> = this.store.select(selectProjectId);

  // Subjects
  private destroy$ = new Subject<void>();
  private submitProjectForm = new ReplaySubject<FormGroup>(1);

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
  ) {}

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

    // Submit form depends on projectId
    this.submitProjectForm
      .pipe(
        takeUntil(this.destroy$),
        filter((form) => form.valid),
        map((form) => form.value),
        switchMap((value: any) =>
          this.projectId$.pipe(
            take(1),
            switchMap((projectId) =>
              defer(() =>
                projectId
                  ? of(this.store.dispatch(ProjectActions.updateProject({ id: projectId, payload: value })))
                  : of(this.store.dispatch(ProjectActions.createProject({ project: value }))),
              ),
            ),
          ),
        ),
      )
      .subscribe();
  }

  onSubmit() {
    this.submitProjectForm.next(this.projectForm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
