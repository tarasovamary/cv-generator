import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      {
        path: 'employees',
        loadChildren: () => import('../home/employees/employees.routes').then((r) => r.employeesRoutes),
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'resume',
        component: ResumeComponent,
      },
    ],
  },
];
