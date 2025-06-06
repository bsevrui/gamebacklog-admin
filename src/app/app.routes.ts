import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/auth.route';
import { platformRoutes } from './pages/platform-module/platform.routes';
import { gameRoutes } from './pages/game-module/game.routes';
import { genreRoutes } from './pages/genre-module/genre.routes';
import { userRoutes } from './pages/user-module/user.route';
import { profileRoutes } from './pages/profile/profile.routes';

export const routes: Routes = [
  {
    path: '',
    children: gameRoutes
  },
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'games',
    children: gameRoutes
  },
  {
    path: 'genres',
    children: genreRoutes
  },
  {
    path: 'platforms',
    children: platformRoutes
  },
  {
    path: 'users',
    children: userRoutes
  },
  {
    path: 'profile',
    children: profileRoutes
  }
];