import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, ApiConfig } from '../providers/api.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _loginEndpoint: string;
  private readonly _logoutEndpoint: string;

  constructor(
    private readonly _apiService: ApiService,
    @Inject(API_CONFIG) apiConfig: ApiConfig,
  ) {
    this._loginEndpoint = apiConfig.endpoints.login;
    this._logoutEndpoint = apiConfig.endpoints.logout;
  }

  public login(username: string, password: string): Observable<boolean> {
    return this._apiService.post<boolean>(this._loginEndpoint, {
      username,
      password,
    });
  }

  public logout(): Observable<boolean> {
    return this._apiService.get<boolean>(this._logoutEndpoint);
  }
}
