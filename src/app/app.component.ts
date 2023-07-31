import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './app.types';
import { MenuLinkComponent } from './components/menu-link/menu-link.component';
import { SkipLinkComponent } from './components/skip-link/skip-link.component';
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
  ],
})
export class AppComponent {
  private _authenticatedLinks: MenuLink[] = [
    { link: '/list', title: 'Your List', icon: 'list' },
    { link: '/settings', title: 'Account Settings', icon: 'settings' },
    { link: '/logout', title: 'Log Out', icon: 'logout' },
  ];
  private _publicLinks: MenuLink[] = [
    { link: '/', title: 'Home', icon: 'home' },
    { link: '/login', title: 'Log In', icon: 'login' },
    { link: '/register', title: 'Sign Up', icon: 'person_add' },
  ];

  protected currentUser: Observable<User | null>;
  protected menuLinks: MenuLink[] = this._publicLinks;

  constructor(
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
}

// Local types

interface MenuLink {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: string | any[] | null | undefined;
  title: string;
  icon?: string;
}
