import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, ApiConfig } from '../providers/api.config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _host: string;

  constructor(
    @Inject(API_CONFIG) apiConfig: ApiConfig,
    private readonly _httpClient: HttpClient,
  ) {
    this._host = apiConfig.host;
  }

  public get<T>(endpoint: string): Observable<T> {
    return this._httpClient.get<T>(this._host + endpoint, {
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  public post<T>(endpoint: string, body: JSONBody): Observable<T> {
    return this._httpClient.post<T>(this._host + endpoint, body, {
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  public put<T>(endpoint: string, body: JSONBody): Observable<T> {
    return this._httpClient.put<T>(this._host + endpoint, body, {
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }

  public delete<T>(endpoint: string): Observable<T> {
    return this._httpClient.delete<T>(this._host + endpoint, {
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    });
  }
}

// Local types

type JSONBody =
  | string
  | number
  | boolean
  | null
  | Record<string, unknown>
  | JSONBody[];
