import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { EntryComponent } from './components/entry/entry.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShareModule} from "../share/share.module";
import {FormErrorModule} from "../form-error/form-error.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NoteService} from "./services/note.service";
import {XhrInterceptor} from "./interceptors/xhr.interceptor";
import {ExceptionInterceptor} from "./interceptors/exception.interceptor";
import {NotepadComponent} from "./components/notepad/notepad.component";
import {ListComponent} from "./components/list/list.component";
import {ViewStatsComponent} from "./components/view/view-stats.component";
import {GistService} from "./services/gist.service";
import {CreatedGistsComponent} from "./components/view/created-gists/created-gists.component";
import {FilesPerGistComponent} from "./components/view/files-per-gist/files-per-gist.component";


@NgModule({
  declarations: [
    EntryComponent,
    ListComponent,
    NotepadComponent,
    ViewStatsComponent,
    CreatedGistsComponent,
    FilesPerGistComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
    FormErrorModule,
    ShareModule
  ],
  providers: [
    NoteService,
    GistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExceptionInterceptor,
      multi: true
    }
  ]
})
export class RoutesModule { }
