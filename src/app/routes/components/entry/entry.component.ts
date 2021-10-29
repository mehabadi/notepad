import { Component, OnInit } from '@angular/core';
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
    notes: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addNote();
  }

  get notes() {
    return this.form.get('notes') as FormArray;
  }

  addNote() {
    this.notes.push(this.fb.control(new Note('', '')));
  }

  remove(index: number){
    this.notes.removeAt(index);
  }
}
