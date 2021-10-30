import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';

@Component({
  template: '<div ngClass="error-message" [hidden]="hide" class="invalid-feedback">{{_text}}</div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  hide: boolean = true;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  _text: string = '';

  @Input() set text(value: string) {
    if (value !== this._text) {
      this._text = value;
      this.hide = !value;
      this._cdr.detectChanges();
    }
  }
}
