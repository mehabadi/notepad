import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { LayoutBodyComponent } from './components/layout-body/layout-body.component';
import {LayoutThemeComponent} from "./components/layout-theme/layout-theme.component";

const ELEMENTS = [
  LayoutHeaderComponent,
  LayoutBodyComponent,
  LayoutThemeComponent
];

@NgModule({
  declarations: [
    ...ELEMENTS,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutThemeComponent
  ]
})
export class CoreModule { }
