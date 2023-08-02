import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const target = state.url ? `/login?target=${state.url}` : '/login';

  return userService
    .setCurrentUser()
    .pipe(map((user) => (user ? true : router.parseUrl(target))));
};
