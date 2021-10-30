import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host,
  Inject, Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewContainerRef
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FORM_ERRORS} from '../injectors/control-error-injection-token';
import {FormActionDirective} from './form-action.directive';
import {EMPTY, merge, Observable, Subject} from 'rxjs';
import {ControlErrorComponent} from '../components/control-error/control-error.component';
import {ControlErrorAnchorDirective} from './control-error-anchor.directive';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[formControl], [formControlName], [ngModel]'
})
export class ControlErrorDirective implements OnInit, OnDestroy {
  @Input() controlErrorAnchor: ControlErrorAnchorDirective | undefined;
  @Input() hideErrorMessage: boolean = false;

  private destroy$ = new Subject();
  private submit$: Observable<Event>;
  private reset$: Observable<Event>;
  private controlErrorComponentRef: ComponentRef<ControlErrorComponent> | undefined;
  private container: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
    /** reference to the current control */
    @Self()
    private control: NgControl,
    @Optional() @Host()
    private form: FormActionDirective,
    @Inject(FORM_ERRORS)
    private errors: any,
    @Optional()
    controlErrorContainer: ControlErrorAnchorDirective,
  ) {
    /** EMPTY: observable that doesn’t do anything and immediately completes.*/
    this.submit$ = form ? form.submit$ : EMPTY;
    this.reset$  = form ? form.reset$  : EMPTY;

    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    if (this.controlErrorAnchor && this.controlErrorAnchor?.vcr) {
      this.container = this.controlErrorAnchor ? this.controlErrorAnchor.vcr : this.vcr;
    }
    // @ts-ignore
    const statusChanges$ = this.control.statusChanges.pipe(distinctUntilChanged());
    const valueChanges$ = this.control.valueChanges || new Subject();

    // @ts-ignore
    merge(
      this.submit$,
      this.reset$,
      statusChanges$,
      valueChanges$
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      /**
       * We’re checking to see if the control contains errors.
       * If it does, we grab the first error and find the error text we need to display.
       */
      const controlErrors = this.control.errors;
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey];
        const params = controlErrors[firstKey];
        const text = getError(params);
        this.setError(text);
      } else if (this.controlErrorComponentRef) {
        this.setError();
      }
    });
  }

  setError(text: string = '') {
    if (!this.controlErrorComponentRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(ControlErrorComponent);
      this.controlErrorComponentRef = this.container.createComponent(factory);
    }

    this.controlErrorComponentRef.instance.text = this.hideErrorMessage ? '' : text;
  }
}
