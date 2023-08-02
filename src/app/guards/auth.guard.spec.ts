import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { Observable, firstValueFrom, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['setCurrentUser']);

    TestBed.configureTestingModule({
      providers: [
        RouterTestingModule,
        { provide: UserService, useValue: userServiceSpy },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if current user', async () => {
    userServiceSpy.setCurrentUser.and.returnValue(
      of({
        id: 1,
        username: 'goallyuser',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    );
    const snapshot = {} as ActivatedRouteSnapshot;
    const routerState = {} as RouterStateSnapshot;
    const result = executeGuard(snapshot, routerState) as Observable<
      boolean | UrlTree
    >;

    const value = await firstValueFrom(result);
    expect(value).toBe(true);
  });

  it('should return UrlTree for /login if no current user', async () => {
    userServiceSpy.setCurrentUser.and.returnValue(of(null));
    const snapshot = {} as ActivatedRouteSnapshot;
    const routerState = {} as RouterStateSnapshot;
    const result = executeGuard(snapshot, routerState) as Observable<
      boolean | UrlTree
    >;

    const value = await firstValueFrom(result);
    expect(value).toBeInstanceOf(UrlTree);

    const urlTree = value as UrlTree;
    expect(urlTree.toString()).toEqual('/login');
  });

  it('should return pass target param if present', async () => {
    userServiceSpy.setCurrentUser.and.returnValue(of(null));
    const snapshot = {} as ActivatedRouteSnapshot;
    const routerState = { url: '/settings' } as RouterStateSnapshot;
    const result = executeGuard(snapshot, routerState) as Observable<
      boolean | UrlTree
    >;

    const value = await firstValueFrom(result);
    expect(value).toBeInstanceOf(UrlTree);

    const urlTree = value as UrlTree;
    expect(urlTree.toString()).toEqual('/login?target=%2Fsettings');
  });
});
