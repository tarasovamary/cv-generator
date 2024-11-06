import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectsComponent } from './projects/projects.component';
import { CvComponent } from './cv/cv.component';

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
        path: 'cv',
        loadChildren: () => import('../home/cv/cv.routes').then((r) => r.cvRoutes),
      },
    ],
  },
];
