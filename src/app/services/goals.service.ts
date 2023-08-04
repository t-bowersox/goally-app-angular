import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../app.types';
import { API_CONFIG, ApiConfig } from '../providers/api.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  private readonly _endpoint: string;

  constructor(
    private readonly _apiService: ApiService,
    @Inject(API_CONFIG) apiConfig: ApiConfig,
  ) {
    this._endpoint = apiConfig.endpoints.goals;
  }

  public createGoal(description: string): Observable<boolean> {
    return this._apiService.post<boolean>(this._endpoint, { description });
  }

  public getGoalsForUser(): Observable<Goal[]> {
    return this._apiService.get<Goal[]>(this._endpoint);
  }

  public updateGoalById(
    id: number,
    description?: string,
    accomplished?: boolean,
  ): Observable<boolean> {
    let body = {};

    if (description !== undefined) {
      body = { description };
    }

    if (accomplished !== undefined) {
      body = { ...body, accomplished };
    }

    return this._apiService.put<boolean>(`${this._endpoint}/${id}`, body);
  }

  public deleteGoalById(id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._endpoint}/${id}`);
  }
}
