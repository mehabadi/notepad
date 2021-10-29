import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { LayoutBodyComponent } from './components/layout-body/layout-body.component';
import {MatCardModule} from '@angular/material/card';
import {LayoutThemeComponent} from "./components/theme-layout/layout-theme.component";

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
    CommonModule,
    MatCardModule
  ],
  exports: [
    LayoutThemeComponent
  ]
})
export class CoreModule { }
