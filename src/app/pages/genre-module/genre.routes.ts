import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const genreRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./genre-module.page').then(m => m.GenreModulePage)
    },
    {
        path: 'add',
        canActivate: [authGuard],
        loadComponent: () => import('./add/add.page').then(m => m.AddPage)
    },
    {
        path: 'update/:genreId',
        canActivate: [authGuard],
        loadComponent: () => import('./update/update.page').then(m => m.UpdatePage)
    }
];