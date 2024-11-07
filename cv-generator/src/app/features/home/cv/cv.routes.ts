import { Route } from '@angular/router';
import { CvComponent } from './cv.component';
import { CreateCvComponent } from './components/create-cv/create-cv.component';
import { EditCvComponent } from './components/edit-cv/edit-cv.component';

export const cvRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
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
