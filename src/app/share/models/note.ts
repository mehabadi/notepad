export interface Notepad {
  id?: string;
  title: string;
  notes: Note[];
}
export class Note {
  constructor(
    public title: string,
    public note: string
  ) {}

  isValid() {
    return (this.title !== undefined) && (this.note != undefined);
  }
}
