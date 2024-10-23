import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then((r) => r.homeRoutes),
    canActivate: [authGuard],
  },
  { path: 'signup', component: AuthComponent, data: { isSignup: true } },
  { path: 'login', component: AuthComponent, data: { isSignup: false } },
];
