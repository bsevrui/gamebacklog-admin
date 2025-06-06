import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const authenticated = await storageService.isAuthenticated();

  if (authenticated) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};