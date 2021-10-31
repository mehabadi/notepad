import {Attribute, Component} from "@angular/core";

export enum LoadingType{
  SPINNER = 'spinner',
  PROGRESS = 'progress'
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  types: typeof LoadingType = LoadingType;
  constructor(
    @Attribute('type')
    public type: string = LoadingType.SPINNER
  ) {}
}
