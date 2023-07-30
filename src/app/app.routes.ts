import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Create an account | Goally',
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    title: 'Goally',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Page not found | Goally',
  },
];
