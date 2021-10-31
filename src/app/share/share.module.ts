import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteInputComponent } from './components/note-input/note-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormErrorModule} from "../form-error/form-error.module";
import {ConfirmComponent} from "./components/confirm/confirm.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {LineChartComponent} from "./components/line-chart/line-chart.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {RefreshableWidgetComponent} from "./components/refreshable-widget/refreshable-widget.component";
import {LoadingComponent} from "./components/loading/loading.component";


const ELEMENTS = [
  NoteInputComponent,
  ConfirmComponent,
  LineChartComponent,
  RefreshableWidgetComponent,
  LoadingComponent
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
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    ...ELEMENTS
  ]
})
export class ShareModule { }
