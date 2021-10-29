import {ControlValueAccessor} from '@angular/forms';
import {Directive} from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractControlValueAccessor implements ControlValueAccessor {
  disabled: boolean = false;

  _value: any = '';

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== undefined && this._value !== val) {
      this._value = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  /**
   * stores the change function as an internal method.
   */
  onChange: any = () => {
  }

  /**
   * stores the blur function as an internal method.
   */
  onTouch: any = () => {
  }

  /**
   * Registers a callback function that is called when
   * the control's value changes in the UI.
   * @param fn
   */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that is called by the forms API on
   * initialization to update the form model on blur.
   * @param fn
   */
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  /**
   * Function that is called by the forms API when the control status
   * changes to or from 'DISABLED'. Depending on the status, it enables
   * or disables the appropriate DOM element.
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * This method is called by the forms API to write to the view when
   * programmatic changes from model to view are requested.
   */
  writeValue(value: any) {
    this.value = value;
  }
}
