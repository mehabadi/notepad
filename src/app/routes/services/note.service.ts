import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";
import {Notepad} from "../../share/models/note";
import {Gist} from "../models/gist";
import {MapperService} from "./mapper.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  changedData$ = new Subject();
  private _data: Notepad[] = [];

  constructor(private http: HttpClient) {
    this._data = JSON.parse(<string>localStorage.getItem('gists')) || [];
  }

  get data(){
    return this._data;
  }

  set data(items) {
    this._data = items;
    localStorage.setItem('gists', JSON.stringify(items || []));
  }

  public getNotepads(): Observable<Notepad[]>{

    if(this.data.length > 0){
      this.updateOutdatedItems();
      return of(this.data);
    }

    return this.http.get<any>('https://api.github.com/users/mehabadi/gists').pipe(
      map((res: Gist[]) => {
        const notepads = res.map(item => MapperService.toNotepad(item)) || [];
        this.data = notepads;
        return notepads;
      })
    );
  }

  public save(notepad: Notepad): Observable<boolean>{
    const gist = MapperService.toGist(notepad);
    // We are updating an existing notepad
    if (!!gist.id){
      return this.http.patch<any>(`https://api.github.com/gists/${gist.id}`, gist).pipe(
        tap((res: any) => {
          this.updateDataItem(res);
        })
      );

    // Otherwise, create a new notepad
    } else {
      return this.http.post<any>('https://api.github.com/gists', gist).pipe(
        tap((res: any) => {
          this.data = [...this.data, {...notepad, id: res.id}];
        })
      );
    }
  }

  public getOne(id: string): Observable<Notepad | undefined>{

    /**
     * gists api (list api) response does not contain file's content.
     * so we have to update items when we need
     */
    const item = this.findById(id);
    if(item?.notes && item.notes?.length > 0  && !!item.notes[0].note) {
      return of(item);
    }

    return this.http.get<Gist>(`https://api.github.com/gists/${id}`).pipe(
      map((res: Gist) => {
        return this.updateDataItem(res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`https://api.github.com/gists/${id}`).pipe(
      tap(() => {
        this.removeNotepadById(id);
        this.changedData$.next();
      })
    );
  }

  private findById(id: string){
    return this.data.find(c => c.id == id);
  }

  private removeNotepadById(id: string){
    this.data = this.data.filter(item => item.id != id);
  }

  private addNotepad(notepad: Notepad){
    this.data = [...this.data, notepad];
  }

  private updateDataItem(gist: Gist): Notepad{
    const notepad = MapperService.toNotepad(gist);
    gist.id && this.removeNotepadById(gist.id);
    this.addNotepad(notepad);
    return notepad;
  }

  private updateOutdatedItems(): void{
    this.http.get<any>('https://api.github.com/users/mehabadi/gists').subscribe((res: Gist[]) => {
      res.forEach(g => {
        const outdated = this.data.find(n => (n.id == g.id) && (n.updated_at != g.updated_at));
        if (outdated) {
          outdated.id && this.removeNotepadById(outdated.id);
          this.addNotepad(MapperService.toNotepad(g));
          this.changedData$.next();
        }
      });
    });
  }

}
