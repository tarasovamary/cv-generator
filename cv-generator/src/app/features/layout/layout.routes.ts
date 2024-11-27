import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const layoutRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.routes').then((r) => r.employeesRoutes),
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.routes').then((r) => r.projectsRoutes),
      },
      {
        path: 'cv',
        loadChildren: () => import('./cv/cv.routes').then((r) => r.cvRoutes),
      },
    ],
  },
];
