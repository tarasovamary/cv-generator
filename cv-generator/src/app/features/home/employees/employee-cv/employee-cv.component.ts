import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CV } from '../../../../core/models/cv.model';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as CvActions from '../../../../core/store/cv/cv.actions';
import { Observable } from 'rxjs';
import { selectAllCv } from '../../../../core/store/cv/cv.selectors';

@Component({
  selector: 'app-employee-cv',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
})
export class EmployeeCvComponent {
  @Input({ required: true }) employeeId!: string;
  cvList: CV[] = [];
  cvForm!: UntypedFormGroup;
  cvs$!: Observable<CV[]>;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CvActions.getAllCv({ employeeId: this.employeeId }));
    this.cvs$ = this.store.select(selectAllCv);

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
