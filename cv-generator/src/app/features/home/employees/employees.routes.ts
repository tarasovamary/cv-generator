import { Route } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeesComponent } from './employees.component';

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
