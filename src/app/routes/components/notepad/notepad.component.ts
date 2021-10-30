import {Component, ViewChild} from "@angular/core";
import {ConfirmComponent} from "../../../share/components/confirm/confirm.component";
import {Notepad} from "../../../share/models/note";
import {AlertTypes} from "../../../core/models/alert";
import {NoteService} from "../../services/note.service";
import {AlertService} from "../../../core/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-notepad',
  template: ''
})
export class NotepadComponent {

  @ViewChild(ConfirmComponent) modal: ConfirmComponent | undefined;
  private deletingItem: Notepad | undefined;

  constructor(
    protected noteService: NoteService,
    protected alertService: AlertService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {}

  confirmDelete(item: Notepad){
    this.deletingItem = item;
    this.modal?.openModal();
  }

  delete(callback: any){
    const id = this.deletingItem?.id;
    if (!!id) {
      this.noteService.delete(id).subscribe( () => {
        this.alertService.show('Changes successfully saved.', AlertTypes.SUCCESS);
        callback();
      });
    }
  }

  view(goUp= false){
    const path = goUp ? '../view-state' : 'view-state';
    this.router.navigate([path], {relativeTo: this.route});
  }
}
