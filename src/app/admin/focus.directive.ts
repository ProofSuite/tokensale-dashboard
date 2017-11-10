import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[Autofocus]'
})
export class MyAutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
