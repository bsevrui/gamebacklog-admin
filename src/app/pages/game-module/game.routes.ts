import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const gameRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./game-module.page').then(m => m.GameModulePage)
    },
    {
        path: 'add',
        canActivate: [authGuard],
        loadComponent: () => import('./add/add.page').then(m => m.AddPage)
    },
    {
        path: 'update/:gameId',
        canActivate: [authGuard],
        loadComponent: () => import('./update/update.page').then(m => m.UpdatePage)
    }
];