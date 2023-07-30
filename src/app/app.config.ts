import {
  ApplicationConfig,
  EnvironmentProviders,
  Provider,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { csrfInterceptor } from './interceptors/csrf.interceptor';
import { API_CONFIG, GOALLY_API_CONFIG } from './providers/api.config';
import { GOALLY_USER_CONFIG, USER_CONFIG } from './providers/user.config';

const providers: (EnvironmentProviders | Provider)[] = [
  provideRouter(routes),
  provideHttpClient(withInterceptors([csrfInterceptor])),
  { provide: API_CONFIG, useValue: GOALLY_API_CONFIG },
  { provide: USER_CONFIG, useValue: GOALLY_USER_CONFIG },
];

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  providers.push(provideNoopAnimations());
} else {
  providers.push(provideAnimations());
}

export const appConfig: ApplicationConfig = {
  providers,
};
