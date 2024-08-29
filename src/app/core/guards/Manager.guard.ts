import { AuthService } from '../../features/auth/auth.service';
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { SessionService } from '../services/session/session.service';

export const managerGuard: CanActivateFn = (route, state) => {
  const authService = inject(SessionService);
  const router = inject(Router);

  if(authService.userRole() === 'ADMIN' || authService.userRole() === 'MANAGER' ) return true;

  return router.createUrlTree(['/home']);
};
