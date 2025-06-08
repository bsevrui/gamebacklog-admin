import { Routes } from "@angular/router";
import { adminGuard } from "src/app/core/guards/admin.guard";
import { authGuard } from "src/app/core/guards/auth.guard";

export const userRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard, adminGuard],
        loadComponent: () => import('./user-module.page').then(m => m.UserModulePage)
    },
    {
        path: 'update/:userId',
        canActivate: [authGuard, adminGuard],
        loadComponent: () => import('./update/update.page').then(m => m.UpdatePage)
    }
];