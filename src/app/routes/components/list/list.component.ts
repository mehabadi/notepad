import {Component, OnDestroy, OnInit} from "@angular/core";
import {NoteService} from "../../services/note.service";
import {Notepad} from "../../../share/models/note";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NotepadComponent} from "../notepad/notepad.component";
import {AlertService} from "../../../core/services/alert.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent extends NotepadComponent implements OnInit, OnDestroy{
  items: Notepad[] | undefined;
  destroy$ = new Subject();

  constructor(
    noteService: NoteService,
    alertService: AlertService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(noteService, alertService, router, route);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this.noteService.getNotepads().pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: Notepad[]) => {
      this.items = res;
      this.loading = false;
    });
  }

  gotoEntry(item: Notepad | null = null){
    const isEditMode = !!item?.id;
    const path = isEditMode? `edit/${item?.id}` : 'entry';
    this.router.navigate([path], {relativeTo: this.route});
  }

  onConfirmed(){
    super.delete(this.loadData.bind(this));
  }

}
