import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./features/layout/layout.routes').then((r) => r.layoutRoutes),
    canActivate: [authGuard],
  },
  { path: 'signup', component: AuthComponent, data: { isSignup: true } },
  { path: 'login', component: AuthComponent, data: { isSignup: false } },
];
