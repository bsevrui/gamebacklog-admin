import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const guestGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const authenticated = await storageService.isAuthenticated();

  if (authenticated) {
    router.navigate(['/games']);
    return false;
  } else {
    return true;
  }
};