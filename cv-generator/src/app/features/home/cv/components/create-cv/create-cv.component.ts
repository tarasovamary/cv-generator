import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { Employee } from '../../../employees/models/employee.model';
import { getAllCvEmployees, resetCurrentCv } from '../../store/cv.actions';
import { selectAllCvEmployees } from '../../store/cv.selectors';
import { CvFormComponent, InitialCvFormState } from '../cv-form/cv-form.component';

@Component({
  selector: 'app-create-cv',
  standalone: true,
  imports: [DropdownModule, NgIf, AsyncPipe, FormsModule, CvFormComponent],
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.scss',
})
export class CreateCvComponent implements OnInit {
  initialCvFormState: InitialCvFormState;
  selectedEmployee!: Employee;
  employees$: Observable<Employee[]> = this.store.select(selectAllCvEmployees);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getAllCvEmployees());
    this.store.dispatch(resetCurrentCv());

    this.initialCvFormState = {
      entityId: this.selectedEmployee?._id,
      entityType: 'employee',
    };
  }
}
