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
        path: 'employees',
        component: EmployeesComponent,
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
