import { NgIf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { Employee } from '../../../employees/models/employee.model';
import { getAllEmployees } from '../../../employees/store/employees.actions';
import { selectAllEmployees } from '../../../employees/store/employees.selectors';
import { CvFormComponent } from '../cv-form/cv-form.component';
import { resetCurrentCv } from '../../store/cv.actions';

@Component({
  selector: 'app-create-cv',
  standalone: true,
  imports: [DropdownModule, NgIf, AsyncPipe, FormsModule, CvFormComponent],
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.scss',
})
export class CreateCvComponent implements OnInit {
  selectedEmployee!: Employee;
  employees$: Observable<Employee[]> = this.store.select(selectAllEmployees);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getAllEmployees());
    this.store.dispatch(resetCurrentCv());
  }
}
