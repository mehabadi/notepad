import {Injectable} from "@angular/core";
import {Gist} from "../models/gist";
import {Note, Notepad} from "../../share/models/note";

@Injectable({
  providedIn: "root"
})
export class MapperService {

  public static toGist(notepad: Notepad): Gist{
    return {
      id: notepad?.id,
      description: notepad.title,
      files: notepad.notes.reduce(
        (previous, current) => ({
          ...previous,
          [current.title]: {
            filename: current.title,
            content: current.note
          }
        }), {})
    } as Gist;
  }

  public static toNotepad(gist: Gist): Notepad{
    return {
      id: gist.id,
      title: gist.description,
      updated_at: gist.updated_at,
      notes: Object.values(gist.files)?.map((item: any) => new Note(item.filename, item.content))
    } as Notepad;
  }
}
