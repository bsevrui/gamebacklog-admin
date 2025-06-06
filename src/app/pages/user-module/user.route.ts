import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const userRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./user-module.page').then(m => m.UserModulePage)
    },
    {
        path: 'update/:userId',
        canActivate: [authGuard],
        loadComponent: () => import('./update/update.page').then(m => m.UpdatePage)
    }
];