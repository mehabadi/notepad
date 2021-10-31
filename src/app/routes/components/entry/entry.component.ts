import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Note, Notepad} from "../../../share/models/note";
import {NoteService} from "../../services/note.service";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NotepadComponent} from "../notepad/notepad.component";
import {AlertService} from "../../../core/services/alert.service";
import {AlertTypes} from "../../../core/models/alert";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent extends NotepadComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject();
  editingItem: Notepad | undefined | null;

  form: FormGroup = new FormGroup({
    id:    new FormControl(),
    title: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(255)])),
    notes: this.fb.array([], Validators.compose([Validators.required]))
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
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
    this.editingItem = null;
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params['id'];
      if (!!id) {
        this.loadNotepad(id);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.isEditMode){
      this.addNote();
    }
  }

  get isEditMode() {
    return !!this.editingItem;
  }

  get returnPath(){
    return this.isEditMode ? '../../' : '../';
  }

  get notes() {
    return this.form.get('notes') as FormArray;
  }

  addNote() {
    this.notes.push(this.fb.control(new Note('', '')));
    this.cdr.detectChanges();
  }

  remove(index: number){
    this.notes.removeAt(index);
  }

  submit(){
    if (this.form.valid){
      this.noteService.save(this.form.value).pipe(
        takeUntil(this.destroy$)
      ).subscribe(res => {
        this.alertService.show('Changes successfully saved.', AlertTypes.SUCCESS);
        setTimeout(this.back.bind(this), 1000);
      });
    }
  }

  back(){
    this.router.navigate([this.returnPath], {relativeTo: this.route});
  }

  viewStats(){
    super.view(this.returnPath);
  }

  loadNotepad(id: string){
    this.noteService.getOne(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((res) => {
      if (res) {
        this.editingItem = res;
        res.notes?.forEach(note => this.addNote());
        this.form.patchValue({...res});
      } else {
        this.alertService.show('Notepad not found. You\'re redirecting to the list...', AlertTypes.DANGER);
        setTimeout(this.back.bind(this), 1000);
      }
    });
  }

  onConfirmed(){
    super.delete(this.back.bind(this));
  }
}
