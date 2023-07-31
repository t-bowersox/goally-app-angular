import { Routes } from '@angular/router';
import { publicGuard } from './guards/public.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

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
