import { Routes } from "@angular/router";
import { adminGuard } from "src/app/core/guards/admin.guard";
import { authGuard } from "src/app/core/guards/auth.guard";

export const genreRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard, adminGuard],
        loadComponent: () => import('./genre-module.page').then(m => m.GenreModulePage)
    },
    {
        path: 'add',
        canActivate: [authGuard, adminGuard],
        loadComponent: () => import('./add/add.page').then(m => m.AddPage)
    },
    {
        path: 'update/:genreId',
        canActivate: [authGuard, adminGuard],
        loadComponent: () => import('./update/update.page').then(m => m.UpdatePage)
    }
];