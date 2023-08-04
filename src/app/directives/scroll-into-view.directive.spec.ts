import { ElementRef } from '@angular/core';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';

describe('ScrollIntoViewDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const directive = new ScrollIntoViewDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
