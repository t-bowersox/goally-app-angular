import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './app.types';
import { MenuLinkComponent } from './components/menu-link/menu-link.component';
import { SkipLinkComponent } from './components/skip-link/skip-link.component';
import { AuthService } from './services/auth.service';
import { CsrfService } from './services/csrf.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    SkipLinkComponent,
    MenuLinkComponent,
    MatSnackBarModule,
  ],
})
export class AppComponent {
  private _authenticatedLinks: MenuLink[] = [
    { link: '/list', title: 'Your list', icon: 'list' },
    { link: '/settings', title: 'Account settings', icon: 'settings' },
  ];
  private _publicLinks: MenuLink[] = [
    { link: '/', title: 'Home', icon: 'home' },
    { link: '/login', title: 'Log in', icon: 'login' },
    { link: '/register', title: 'Sign up', icon: 'person_add' },
  ];

  protected currentUser: Observable<User | null>;
  protected menuLinks: MenuLink[] = this._publicLinks;

  constructor(
    private readonly _authService: AuthService,
    private readonly _matSnackBar: MatSnackBar,
    private readonly _router: Router,
    csrfService: CsrfService,
    iconRegistry: MatIconRegistry,
    userService: UserService,
  ) {
    iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
    csrfService.getToken().subscribe();

    this.currentUser = userService.currentUser;
    this.currentUser.subscribe((user) => {
      this.menuLinks = user ? this._authenticatedLinks : this._publicLinks;
    });
  }

  protected handleLogout(sidenav?: MatSidenav): void {
    sidenav?.close();

    this._authService.logout().subscribe({
      next: async () => {
        await this._router.navigateByUrl('/login');
      },
      error: async (err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Session is cleared in this case
          await this._router.navigateByUrl('/login');
          return;
        }

        this._matSnackBar.open(
          'Sorry, something went wrong. Please refresh the page and try again.',
          'OK',
        );
      },
    });
  }
}

// Local types

interface MenuLink {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: string | any[] | null | undefined;
  title: string;
  icon?: string;
}
