import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../../models/employee.model';
import * as EmployeesActions from '../../store/employees.actions';
import { selectCurrentEmployee } from '../../store/employees.selectors';

import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeCvComponent } from '../../../cv/components/employee-cv/employee-cv.component';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeeComponent implements OnInit {
  employeeId!: string;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(EmployeesActions.getEmployeeById({ id: this.employeeId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
