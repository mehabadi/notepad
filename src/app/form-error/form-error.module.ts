import {NgModule} from '@angular/core';
import {ControlErrorDirective} from './directives/control-error.directive';
import {ControlErrorAnchorDirective} from './directives/control-error-anchor.directive';
import {FormActionDirective} from './directives/form-action.directive';
import {ControlErrorComponent} from './components/control-error/control-error.component';
import {CommonModule} from '@angular/common';

const ELEMENTS = [
  ControlErrorDirective,
  ControlErrorAnchorDirective,
  FormActionDirective,
  ControlErrorComponent
];

@NgModule({
  declarations: [
    ...ELEMENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...ELEMENTS
  ],
  entryComponents: [ControlErrorComponent]
})
export class FormErrorModule {}
