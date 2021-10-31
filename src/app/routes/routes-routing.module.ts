import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntryComponent} from "./components/entry/entry.component";
import {ListComponent} from "./components/list/list.component";
import {ViewStatsComponent} from "./components/view/view-stats.component";

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
      path: 'edit',
      redirectTo: ''
    },

    {
      path: 'view-state',
      component: ViewStatsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
