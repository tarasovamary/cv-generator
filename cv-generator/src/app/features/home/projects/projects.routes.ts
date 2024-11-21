import { Route } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';

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
  {
    path: 'create',
    component: CreateProjectComponent,
  },
];
