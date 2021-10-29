import {Attribute, Component, forwardRef, Injector, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR, NgControl, Validators} from "@angular/forms";
import {AbstractControlValueAccessor} from "../../directives/abstract-control-value-accessor";
import {Note} from "../../models/note";

@Component({
  selector: 'app-note-input',
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoteInputComponent),
      multi: true
    }
  ]
})
export class NoteInputComponent extends AbstractControlValueAccessor implements OnInit, OnChanges {
  @Input() inputClass: string = '';

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(255)])),
    note: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(1000)]))
  });
  formControl: NgControl | undefined;

  constructor(
    private _injector: Injector,
    @Attribute('placeholder')
    public placeholder: string = ''
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.disabled) {
      this.changeDisableState(!!changes.disabled);
    }
  }

  ngOnInit(): void {
    this.formControl = this._injector.get(NgControl);

    this.changeDisableState(this.disabled);
  }

  changeDisableState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  get value() {
    return this._value;
  }

  set value(val: Note) {
    if (val !== undefined && this._value !== undefined &&
      ((this._value?.title != val?.title) || (this._value?.note != val?.note))) {
      this._value = val;
      this.form.patchValue({...val});
      this.onChange(val);
      this.onTouch(val);
    }
  }

  writeValue({title, note}: Note) {
    const val = new Note(title, note);
    if (!val.isValid()) {
      console.error(`Initial value for formControlName="${this.formControl?.name}" is invalid`);
    }

    this.value = val.isValid() ? val : new Note('', '');
  }

  titleChange(event: any) {
    const title = event.target.value;
    if (!!this.value) {
      this.value = {...this._value, title} as Note;
      return;
    }
    this.value = new Note(title, '');
  }

  noteChange(event: any) {
    const note = event.target.value;
    if (!!this.value) {
      this.value = {...this._value, note} as Note;
      return;
    }
    this.value = new Note('', note);
  }
}
