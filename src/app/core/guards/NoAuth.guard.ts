import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { inject } from '@angular/core';
import { SessionService } from '../services/session/session.service';

export const noAuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(SessionService);
  const router = inject(Router);
  
  if(!authService.isAuth()) return true;

  return router.createUrlTree(['/home']);
};
