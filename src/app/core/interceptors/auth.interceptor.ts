import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
    const storageService = inject(StorageService);

    return from(storageService.getAccessToken()).pipe(
        switchMap((token) => {
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            return next(req);
        })
    );
};