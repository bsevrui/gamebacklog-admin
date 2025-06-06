import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const platformRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./platform-module.page').then(m => m.PlatformModulePage)
    }
];