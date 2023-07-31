import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export const publicGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService
    .setCurrentUser()
    .pipe(map((user) => (user ? router.parseUrl('/list') : true)));
};
