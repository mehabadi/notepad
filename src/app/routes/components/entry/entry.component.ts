import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../../share/models/note";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(255)])),
    notes: this.fb.array([], Validators.compose([Validators.required]))
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.addNote();
  }

  get notes() {
    return this.form.get('notes') as FormArray;
  }

  addNote() {
    this.notes.push(this.fb.control(new Note('', '')));
    this.cdr.detectChanges();
  }

  remove(index: number){
    this.notes.removeAt(index);
  }

  submit(){
    console.log(this.form.valid)
  }
}
