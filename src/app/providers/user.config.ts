import { InjectionToken } from '@angular/core';

export const USER_CONFIG = new InjectionToken<UserConfig>('user.config');

export type UserConfig = typeof GOALLY_USER_CONFIG;

export const GOALLY_USER_CONFIG = Object.freeze({
  passwordMinLength: 8,
  usernameMaxLength: 50,
});
