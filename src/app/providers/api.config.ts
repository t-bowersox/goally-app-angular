import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.development';

export const API_CONFIG = new InjectionToken<ApiConfig>('api.config');

export type ApiConfig = typeof GOALLY_API_CONFIG;

export const GOALLY_API_CONFIG = Object.freeze({
  host: environment.apiHost,
  endpoints: Object.freeze({
    csrfToken: '/csrf-token',
    goals: '/goals',
    login: '/auth/login',
    logout: '/auth/logout',
    user: '/user',
  }),
});
