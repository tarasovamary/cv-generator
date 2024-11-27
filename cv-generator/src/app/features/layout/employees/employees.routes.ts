import { Route } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeesComponent } from './employees.component';
import { EmployeeCvComponent } from '../cv/components/employee-cv/employee-cv.component';

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
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        component: EmployeeFormComponent,
      },
      {
        path: 'cv',
        component: EmployeeCvComponent,
      },
    ],
  },
];
