import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteInputComponent } from './components/note-input/note-input.component';
import {ReactiveFormsModule} from "@angular/forms";


const ELEMENTS = [
  NoteInputComponent
];

@NgModule({
  declarations: [
    ...ELEMENTS
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ...ELEMENTS
  ]
})
export class ShareModule { }
