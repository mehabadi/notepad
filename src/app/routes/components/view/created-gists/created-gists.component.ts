import {Component} from "@angular/core";
import {GistService} from "../../../services/gist.service";
import {Widget} from "../../../../share/models/widget";
import {WIDGET} from "../../../../share/injectors/widget-injection-token";

@Component({
  selector: 'app-created-gists',
  templateUrl: './created-gists.component.html',
  providers: [
    {
      provide: WIDGET,
      useExisting: CreatedGistsComponent
    }
  ]
})
export class CreatedGistsComponent implements Widget{
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
    this.gistService.getCreatedGistsBasedOnDataTime().subscribe(res => {
      this.loading = false;
      this.data = res;
    });
  }

}

