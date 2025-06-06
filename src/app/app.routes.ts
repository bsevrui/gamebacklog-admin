import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'user-module',
    loadComponent: () => import('./pages/user-module/user-module.page').then( m => m.UserModulePage)
  },
  {
    path: 'platform-module',
    loadComponent: () => import('./pages/platform-module/platform-module.page').then( m => m.PlatformModulePage)
  },
  {
    path: 'genre-module',
    loadComponent: () => import('./pages/genre-module/genre-module.page').then( m => m.GenreModulePage)
  },
  {
    path: 'game-module',
    loadComponent: () => import('./pages/game-module/game-module.page').then( m => m.GameModulePage)
  },
];