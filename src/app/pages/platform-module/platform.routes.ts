import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const platformRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./platform-module.page').then(m => m.PlatformModulePage)
    },
    {
        path: 'add',
        canActivate: [authGuard],
        loadComponent: () => import('./add/add.page').then(m => m.AddPage)
    },
    {
        path: 'update/:platformId',
        canActivate: [authGuard],
        loadComponent: () => import('./update/update.page').then(m => m.UpdatePage)
    }
];