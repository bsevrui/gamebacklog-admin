import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const profileRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./profile.page').then(m => m.ProfilePage)
    }
];