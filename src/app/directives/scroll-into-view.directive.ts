import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]',
  standalone: true,
})
export class ScrollIntoViewDirective implements AfterViewInit {
  constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.scrollIntoView(true);
  }
}
