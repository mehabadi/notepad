import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notepad} from "../../share/models/note";
import {Gist} from "../models/gist";
import {MapperService} from "./mapper.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private data: Notepad[] = [];

  constructor(private http: HttpClient) {}

  public getNotepads(): Observable<Notepad[]>{

    return this.http.get<any>('https://api.github.com/users/mehabadi/gists').pipe(
      map((res: Gist[]) => {
        return res.map(item => MapperService.toNotepad(item));
      }),
      tap(res => {
        this.data = res;
      })
    );
  }

  public save(notepad: Notepad): Observable<boolean>{
    const gist = MapperService.toGist(notepad);
    // We are updating an existing notepad
    if (!!gist.id){
      return this.http.patch<any>(`https://api.github.com/gists/${gist.id}`, gist);

    // Otherwise, create a new notepad
    } else {
      return this.http.post<any>('https://api.github.com/gists', gist);
    }
  }

  public getOne(id: string): Observable<Notepad | undefined>{
    return this.http.get<Gist>(`https://api.github.com/gists/${id}`).pipe(
      map((res: Gist) => {
        return MapperService.toNotepad(res);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`https://api.github.com/gists/${id}`);
  }
}
