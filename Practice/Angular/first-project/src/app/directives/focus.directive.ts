import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements OnInit, AfterViewInit {
  constructor(public el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
