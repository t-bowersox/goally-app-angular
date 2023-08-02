import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../app.types';
import { API_CONFIG, ApiConfig } from '../providers/api.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser = new BehaviorSubject<User | null>(null);
  private readonly _endpoint: string;

  public get currentUser(): Observable<User | null> {
    return this._currentUser.asObservable();
  }

  constructor(
    @Inject(API_CONFIG) apiConfig: ApiConfig,
    private readonly _apiService: ApiService,
  ) {
    this._endpoint = apiConfig.endpoints.user;
  }

  public create(
    username: string,
    password: string,
    passwordConfirmation: string,
  ): Observable<boolean> {
    return this._apiService.post<boolean>(this._endpoint, {
      username,
      password,
      passwordConfirmation,
    });
  }

  public setCurrentUser(): Observable<User | null> {
    return this._apiService
      .get<User | null>(this._endpoint)
      .pipe(tap((user) => this._currentUser.next(user)));
  }

  public updateUsername(
    username: string,
    currentPassword: string,
  ): Observable<boolean> {
    return this._apiService
      .put<boolean>(this._endpoint, { username, currentPassword })
      .pipe(
        tap((updated) => {
          if (updated) {
            // Refresh user to reflect new username
            this.setCurrentUser().subscribe();
          }
        }),
      );
  }

  public updatePassword(
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
  ): Observable<boolean> {
    return this._apiService.put<boolean>(this._endpoint, {
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    });
  }
}
