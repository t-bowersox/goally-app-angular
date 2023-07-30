import {
  ApplicationConfig,
  EnvironmentProviders,
  Provider,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { routes } from './app.routes';

const providers: (EnvironmentProviders | Provider)[] = [provideRouter(routes)];

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  providers.push(provideNoopAnimations());
} else {
  providers.push(provideAnimations());
}

export const appConfig: ApplicationConfig = {
  providers,
};
