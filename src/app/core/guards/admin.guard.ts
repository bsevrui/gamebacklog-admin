import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const user = await storageService.getUserData();

  if (user.role == 'ADMIN') {
    return true;
  } else {
    router.navigate(['/profile']);
    return false;
  }
};
