import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, ApiConfig } from '../providers/api.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  private readonly _endpoint: string;

  constructor(
    @Inject(API_CONFIG) apiConfig: ApiConfig,
    private readonly _apiService: ApiService,
  ) {
    this._endpoint = apiConfig.endpoints.csrfToken;
  }

  public getToken(): Observable<void> {
    return this._apiService.get(this._endpoint);
  }
}
