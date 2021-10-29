import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { EntryComponent } from './components/entry/entry.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "../share/share.module";


@NgModule({
  declarations: [
    EntryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
    ShareModule
  ]
})
export class RoutesModule { }
