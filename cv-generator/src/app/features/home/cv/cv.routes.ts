import { Route } from '@angular/router';
import { CreateCvComponent } from './components/create-cv/create-cv.component';
import { EditCvComponent } from './components/edit-cv/edit-cv.component';
import { CvListComponent } from './components/cv-list/cv-list.component';

export const cvRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: CvListComponent,
  },
  {
    path: 'create',
    component: CreateCvComponent,
  },
  {
    path: ':id',
    component: EditCvComponent,
  },
];
