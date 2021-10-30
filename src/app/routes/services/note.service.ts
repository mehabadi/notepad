import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Note, Notepad} from "../../share/models/note";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private data: Notepad[] = [
    {
      id:     "1514C484-9CD7-534B-AB54-688C2E6AF331",
      title:  "id, erat. Etiam vestibulum",
      notes: [
        {
          id: "1514C484-9CD7-534B-AB54-688C2E6AF331",
          title: "non, cursus non, egestas a, dui.",
          note: "aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec"
        } as Note,
        {
          id: "792716AB-9B2D-4CFD-3643-273E7C79DBDB",
          title: "habitant morbi tristique senectus et netus et malesuada",
          note: "lectus convallis est, vitae sodales nisi magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse"
        } as Note
      ]
    },
    {
      id:     "792716AB-9B2D-4CFD-3643-273E7C79DBDB",
      title:  "hendrerit id, ante. Nunc",
      notes: [
        {
          id: "AE5F9397-3AB9-445B-8322-E4E81C4BCDAA",
          title: "sed, hendrerit a, arcu. Sed et libero. Proin mi.",
          note: "risus varius orci, in consequat enim diam vel arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum. Sed auctor odio a purus."
        } as Note,
        {
          id: "5728E3F8-36FE-932F-1659-D2A54AA29ED6",
          title: "nibh lacinia orci, consectetuer euismod est arcu ac",
          note: "Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod"
        } as Note
      ]
    },
    {
      id:     "AE5F9397-3AB9-445B-8322-E4E81C4BCDAA",
      title:  "nec metus facilisis",
      notes: [
        {
          id: "FCFA646B-512E-0F2C-DD73-93BB7D885417",
          title: "vel turpis. Aliquam adipiscing lobortis risus.",
          note: "lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eget"
        } as Note
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  public getNotepads(): Observable<Notepad[]>{
    return of(this.data);
  }

  public save(notepad: Notepad): Observable<boolean>{
    // We are updating an existing notepad
    if (!!notepad.id){

      // return this.http.put<boolean>('', notepad);
      const index = this.findIndexById(notepad.id);
      if (index !== -1) {
        this.data[index] = notepad;
      }

    // Otherwise, create a new notepad
    } else {
      // return this.http.post<boolean>('', notepad);

      this.data.push(notepad);
    }
    return of(true);
  }

  private findById(id: string){
    return this.data.find(c => c.id == id);
  }

  private findIndexById(id: string){
    return this.data.findIndex(c => c.id == id);
  }

  public getOne(id: string): Observable<Notepad | undefined>{
    const item = this.findById(id);
    return of(item);
  }

  delete(id: string): Observable<any> {
    const index = this.findIndexById(id);
    if (index !== -1) {
      return of(this.data.splice(index, 1));
    }
    return of(null);
  }
}
