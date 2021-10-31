import {Component} from "@angular/core";
import {GistService} from "../../../services/gist.service";
import {Widget} from "../../../../share/models/widget";
import {WIDGET} from "../../../../share/injectors/widget-injection-token";

@Component({
  selector: 'app-files-per-gist',
  templateUrl: './files-per-gist.component.html',
  providers: [
    {
      provide: WIDGET,
      useExisting: FilesPerGistComponent
    }
  ]
})
export class FilesPerGistComponent implements Widget{
  data: any[] = [];
  loading: boolean = false;

  constructor(
    private gistService: GistService
  ) {}

  load(){
    this.loadData();
  }

  refresh(): void {
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this.gistService.getFilesPerGistBasedOnDataTime().subscribe(res => {
      this.loading = false;
      this.data = res;
    })
  }

}

