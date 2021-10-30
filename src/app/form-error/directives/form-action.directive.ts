import {Directive, ElementRef} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[formGroup]'
})
export class FormActionDirective {
  // We’re also using the shareReplay() operator,
  // as we always want to create one event listener
  // and not one per control.
  submit$: Observable<Event> = fromEvent(this.element, 'submit').pipe(
      tap(() => {
        if (this.element.classList.contains('submitted') === false) {
          this.element.classList.add('submitted');
        }
      }),
      shareReplay({refCount: true, bufferSize: 1})
    );

  reset$: Observable<Event> = fromEvent(this.element, 'reset').pipe(
      tap(() => {
        this.element.classList.remove('submitted');
      }),
      shareReplay({refCount: true, bufferSize: 1})
    );

  constructor(private host: ElementRef<HTMLFormElement>) {}

  get element() {
    return this.host.nativeElement;
  }
}
