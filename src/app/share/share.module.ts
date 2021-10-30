import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteInputComponent } from './components/note-input/note-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormErrorModule} from "../form-error/form-error.module";
import {ConfirmComponent} from "./components/confirm/confirm.component";
import {ModalModule} from "ngx-bootstrap/modal";


const ELEMENTS = [
  NoteInputComponent,
  ConfirmComponent
];

@NgModule({
  declarations: [
    ...ELEMENTS
  ],
  imports: [
    ModalModule.forRoot(),
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
