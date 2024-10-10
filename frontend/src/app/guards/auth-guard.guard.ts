import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { ModalService } from '../services/modal.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  
  const sessionService = inject(SessionService);
  const router = inject(Router);
  const modal = inject(ModalService);

  const userRole = sessionService.getToken('role');

// Redirect or deny access based on expected roles
if (route.data['roles'] && !route.data['roles'].includes(userRole)) {
  router.navigate(['/home']); // Redirect to login if not authorized
  modal.openSignup();
  return false;
}

return true;

};
