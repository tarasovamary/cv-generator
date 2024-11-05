import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { EmployeeCvComponent } from '../../../cv/components/employee-cv/employee-cv.component';
import { Employee } from '../../models/employee.model';
import * as EmployeesActions from '../../store/employees.actions';
import { selectCurrentEmployee } from '../../store/employees.selectors';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [NgClass, NgIf, EmployeeCvComponent, EmployeeFormComponent, AsyncPipe],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {
  activeTab: string = 'info';
  employeeId!: string;
  employee$!: Observable<Employee | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(EmployeesActions.getEmployeeById({ id: this.employeeId }));

    this.employee$ = this.store.pipe(select(selectCurrentEmployee));
  }

  onSubmit(employeeData: Employee) {
    this.store.dispatch(
      EmployeesActions.updateEmployee({
        id: this.employeeId,
        payload: employeeData, //TODO: only changed fields
      }),
    );
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
