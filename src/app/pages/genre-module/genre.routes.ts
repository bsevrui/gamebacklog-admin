import { Routes } from "@angular/router";
import { authGuard } from "src/app/core/guards/auth.guard";

export const genreRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./genre-module.page').then(m => m.GenreModulePage)
    }
];