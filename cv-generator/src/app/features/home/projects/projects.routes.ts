import { Route } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';

export const projectsRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ProjectsListComponent,
  },
];
