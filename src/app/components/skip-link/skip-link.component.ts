import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skip-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './skip-link.component.html',
  styleUrls: ['./skip-link.component.scss'],
})
export class SkipLinkComponent {
  private _url = '#main';
  protected set url(url: string) {
    const withoutFragment = url.split('#')[0];
    this._url = `${withoutFragment}#main`;
  }
  protected get url(): string {
    return this._url;
  }

  constructor(private readonly _location: Location) {
    this._location.onUrlChange((url) => (this.url = url));
  }
}
