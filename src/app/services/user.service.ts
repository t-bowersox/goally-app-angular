import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, ApiConfig } from '../providers/api.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _endpoint: string;

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
}
