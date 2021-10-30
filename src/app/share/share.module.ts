import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteInputComponent } from './components/note-input/note-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormErrorModule} from "../form-error/form-error.module";


const ELEMENTS = [
  NoteInputComponent
];

@NgModule({
  declarations: [
    ...ELEMENTS
  ],
  imports: [
    FormErrorModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ...ELEMENTS
  ]
})
export class ShareModule { }
