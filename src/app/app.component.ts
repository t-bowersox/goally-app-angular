import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuLinkComponent } from './components/menu-link/menu-link.component';
import { SkipLinkComponent } from './components/skip-link/skip-link.component';
import { CsrfService } from './services/csrf.service';

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
  protected publicLinks: MenuLink[] = [
    { link: '/', title: 'Home', icon: 'home' },
    { link: '/login', title: 'Log In', icon: 'login' },
    { link: '/register', title: 'Sign Up', icon: 'person_add' },
  ];

  constructor(iconRegistry: MatIconRegistry, csrfService: CsrfService) {
    iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
    csrfService.getToken().subscribe();
  }
}

// Local types

interface MenuLink {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: string | any[] | null | undefined;
  title: string;
  icon?: string;
}
