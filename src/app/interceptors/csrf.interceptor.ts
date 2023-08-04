import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../providers/api.config';

export const csrfInterceptor: HttpInterceptorFn = (
  request,
  next,
): Observable<HttpEvent<unknown>> => {
  const apiConfig = inject(API_CONFIG);
  const apiHost = apiConfig.host;
  const protectedMethods = ['post', 'put', 'patch', 'delete'];

  if (
    !protectedMethods.includes(request.method.toLowerCase()) ||
    !request.url.startsWith(apiHost)
  ) {
    return next(request);
  }

  const csrfToken = getCsrfToken();

  if (csrfToken) {
    request = request.clone({ setHeaders: { 'X-XSRF-TOKEN': csrfToken } });
  }

  return next(request);
};

function getCsrfToken(): string | null {
  if (!document.cookie) {
    return null;
  }

  const cookies = document.cookie
    .split(';')
    .reduce((parsed: Record<string, string>, current) => {
      const [k, v] = current.trim().split('=');
      parsed[k] = v;
      return parsed;
    }, {});

  return cookies['XSRF-TOKEN'] ?? null;
}
