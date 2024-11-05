import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CV } from '../../models/cv.model';
import * as CvActions from '../../store/cv.actions';
import { selectAllCv } from '../../store/cv.selectors';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-cv',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
})
export class EmployeeCvComponent {
  @Input({ required: true }) employeeId!: string;
  activeCvId!: string;
  cvForm!: UntypedFormGroup;
  cvs$!: Observable<CV[]>;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CvActions.getAllCv({ employeeId: this.employeeId }));
    this.cvs$ = this.store.select(selectAllCv);

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

    // Set the first CV as active
    this.cvs$.subscribe((cvs) => {
      if (cvs.length > 0) {
        this.setActiveCv(cvs[0]);
      }
    });
  }

  onDeleteCv(id: string) {}

  onSubmit() {}

  onCancel() {}

  setActiveCv(cv: CV) {
    this.activeCvId = cv._id;

    this.cvForm.patchValue(cv);
  }
}
