import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntryComponent} from "./components/entry/entry.component";
import {ListComponent} from "./components/list/list.component";
import {ViewStateComponent} from "./components/view/view-state.component";

const routes: Routes = [
    {
      path: '',
      component: ListComponent
    },
    {
      path: 'entry',
      component: EntryComponent
    },
    {
      path: 'edit/:id',
      component: EntryComponent
    },
    {
      path: 'view-state',
      component: ViewStateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
