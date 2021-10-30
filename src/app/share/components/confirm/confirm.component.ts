import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
  modalRef?: BsModalRef;
  @Output() confirm = new EventEmitter<void>()

  @ViewChild('template') template: TemplateRef<any> | undefined;

  constructor(private modalService: BsModalService) {}

  openModal() {
    if (this.template) {
      this.modalRef = this.modalService.show(this.template, {class: 'modal-sm'});
    }
  }

  confirmed(): void {
    this.confirm.emit();
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
