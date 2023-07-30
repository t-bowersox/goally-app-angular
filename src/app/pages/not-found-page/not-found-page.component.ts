import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  private readonly _emojiList = ['😕', '🙃', '🤕', '😭', '🫥', '😖'];
  protected emoji: string;

  constructor() {
    this.emoji = this._getRandomEmoji();
  }

  private _getRandomEmoji(): string {
    const seed = Math.random();
    const selection = Math.floor(seed * this._emojiList.length);
    return this._emojiList[selection];
  }
}
