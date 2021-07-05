import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appStyles]'
})
export class StylesDirective {

  /* private el: ElementRef ----> injected */
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'red';
    el.nativeElement.style.color = 'white';
    el.nativeElement.style.boxShadow = '2px 2px rgb(100, 10, 10)';
  }

}
