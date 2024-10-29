import { Route } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeesComponent } from './employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

export const employeesRoutes: Route[] = [
  {
    path: '',
    component: EmployeesComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateEmployeeComponent,
  },
  {
    path: ':id',
    component: EditEmployeeComponent,
  },
];
