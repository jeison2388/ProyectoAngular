import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUpper]'
})
export class UpperDirective {
/*
  constructor(public ref: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event) {
    this.ref.nativeElement.value = event.target.value.toUpperCase();
  }*/

  constructor() { }

  @HostListener('keydown', ['$event']) onKeyDown(event:KeyboardEvent) {
    if (event.keyCode>32 && event.keyCode<128)
   {
      event.target['value']+=event.key.toUpperCase();
      event.preventDefault(); //stop propagation
      //must create a "input" event, if not, there are no change in your value
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("input", false, true);
      event.target.dispatchEvent(evt);
    }

  }

}