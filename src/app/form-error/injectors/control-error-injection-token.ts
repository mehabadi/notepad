import {InjectionToken} from '@angular/core';

// @ts-ignore
export const defaultErrors = {
  required:   () => 'This field is required',
  email:      () => 'Email is invalid',
  minlength:  ({requiredLength, actualLength}: {requiredLength: string, actualLength: string}) => `Expect ${requiredLength} but got ${actualLength}`,
  maxlength:  ({requiredLength}: {requiredLength: string}) => `Maximum of ${requiredLength} characters`,
  max:        ({max}: {max: string}) => `Value should be less than ${max}`,
  min:        ({min}: {min: string}) => `Value should be greater than ${min}`,
  pattern:    () => 'Invalid pattern',
  notes:       ({title, note}: {title: boolean, note: boolean}) => {
    if (title && note) {
      return 'Title and Note are invalid';
    } else if (title) {
      return 'Title is invalid.';
    } else if (note){
      return 'Note is invalid';
    }
    return 'Invalid entry';
  }
};

export const FORM_ERRORS = new InjectionToken('FORM_ERROS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
