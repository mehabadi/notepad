import {Component, ContentChild, OnInit} from "@angular/core";
import {Widget} from "../../models/widget";
import {WIDGET} from "../../injectors/widget-injection-token";

@Component({
  selector: 'app-widget',
  templateUrl: './refreshable-widget.component.html',
  styleUrls: ['./refreshable-widget.component.scss']
})
export class RefreshableWidgetComponent implements OnInit{

  @ContentChild(WIDGET as any, {static: true})
  public widget: Widget | undefined;

  ngOnInit(): void {
    this.widget?.load();
  }

  onRefresh(){
    this.widget?.refresh();
  }
}
