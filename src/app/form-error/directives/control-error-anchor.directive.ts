import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[controlErrorAnchor]',
  exportAs: 'controlErrorAnchor'
})
export class ControlErrorAnchorDirective {
  constructor(public vcr: ViewContainerRef) {
  }
}
