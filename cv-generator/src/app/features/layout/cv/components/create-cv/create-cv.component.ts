import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { Employee } from '../../../employees/models/employee.model';
import { getAllCvEmployees, resetCurrentCv } from '../../store/cv.actions';
import { selectAllCvEmployees } from '../../store/cv.selectors';
import { CvFormComponent, InitialCvFormState } from '../cv-form/cv-form.component';
import { Project } from '../../../projects/models/project.model';
import { CvState } from '../../store/cv.state';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-cv',
  standalone: true,
  imports: [DropdownModule, NgIf, AsyncPipe, FormsModule, CvFormComponent],
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCvComponent implements OnInit {
  initialCvFormState: InitialCvFormState;
  selectedEmployee!: Employee;
  employees$: Observable<Employee[]> = this.store.select(selectAllCvEmployees);

  constructor(private store: Store<CvState>, private route: ActivatedRoute,  private router: Router) {}

  ngOnInit() {
    this.store.dispatch(getAllCvEmployees());
    this.store.dispatch(resetCurrentCv());

    this.initialCvFormState = {
      entityId: this.selectedEmployee?._id,
      entityType: 'employee',
    };

    this.route.queryParams.subscribe(params => {
      const employeeId = params['employeeId'];

      if (employeeId) {
        this.setSelectedEmployee(employeeId);
      }
    });
  }

  setSelectedEmployee(employeeId: string): void {
    this.employees$.subscribe(employees => {
      this.selectedEmployee = employees.find(employee => employee._id === employeeId);
    });
  }

  onEmployeeChange(employee: any): void {
    if (employee) {
      this.selectedEmployee = employee;

      // Update route parameters with new employeeId
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { employeeId: employee._id },
        queryParamsHandling: 'merge' // Saves other request parameters
      });
    }
  }
}
