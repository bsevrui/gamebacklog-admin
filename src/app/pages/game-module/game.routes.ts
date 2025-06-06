import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const gameRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./game-module.page').then(m => m.GameModulePage)
    }
];