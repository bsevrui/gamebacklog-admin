import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const userRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./user-module.page').then(m => m.UserModulePage)
    }
];