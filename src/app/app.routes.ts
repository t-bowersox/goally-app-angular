import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Create an account | Goally',
    canActivate: [publicGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Log in | Goally',
    canActivate: [publicGuard],
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    title: 'Account settings | Goally',
    canActivate: [authGuard],
  },
  {
    path: 'list',
    component: ListPageComponent,
    title: 'Your list | Goally',
    canActivate: [authGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    title: 'Goally',
    canActivate: [publicGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Page not found | Goally',
  },
];
