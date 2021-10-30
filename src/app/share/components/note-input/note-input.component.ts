import {Component, forwardRef, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators
} from "@angular/forms";
import {AbstractControlValueAccessor} from "../../directives/abstract-control-value-accessor";
import {Note} from "../../models/note";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-note-input',
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoteInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NoteInputComponent,
      multi: true,
    },
  ]
})
export class NoteInputComponent extends AbstractControlValueAccessor implements OnInit, Validator, OnDestroy {
  @Input() inputClass: string = '';

  private destroy$ = new Subject();
  private _title: string = '';
  private _note:  string = '';
  title = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(255)]));
  note  = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(1000)]));

  formControl: NgControl | undefined;

  constructor(
    private _injector: Injector
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.formControl = this._injector.get(NgControl);

    this.title.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(val => {
      if (this._title !== val) {
        this._title = val;
        this.value = new Note(val, this._note);
      }
    });

    this.note.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(val => {
      if (this._note !== val) {
        this._note = val;
        this.value = new Note(this._title, val);
      }
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const isTitleValid = this.title.valid;
    const isNoteValid  = this.note.valid;
    if (isTitleValid && isNoteValid){
      return null;
    }
    return {notes: {title: !isTitleValid, note: !isNoteValid}};
  }

  get value() {
    return this._value;
  }

  set value(val: Note) {
    if (val !== undefined && this._value !== undefined &&
      ((this._value?.title != val?.title) || (this._value?.note != val?.note))) {
      this._value = val;
      this.title.patchValue(val.title);
      this.note.patchValue(val.note);
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
}
