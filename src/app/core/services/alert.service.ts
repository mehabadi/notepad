import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Alert, AlertTypes} from "../models/alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert$ = new Subject<Alert>();

  public show(message: string, type: AlertTypes): void {
    this.alert$.next(new Alert(message, type));
  }
}
