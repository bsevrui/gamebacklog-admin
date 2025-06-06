import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/auth.route';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/auth/login/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'auth',
    children: authRoutes
  }
];