import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor() { }

  @Input() OnlyNumber = true;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.OnlyNumber && 
        Number.isNaN(parseInt(event.key)) && 
        event.key !== 'Backspace' &&
        event.key !== 'Delete') {
        event.preventDefault();
      }
  }
}