import {Component, OnDestroy} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Alert} from "../../models/alert";

@Component({
  selector: 'app-layout-body',
  templateUrl: './layout-body.component.html',
  styleUrls: ['./layout-body.component.scss']
})
export class LayoutBodyComponent implements OnDestroy{
  private destroy$ = new Subject();
  alert: Alert | undefined;

  constructor(
    private alertService: AlertService
  ) {
    alertService.alert$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(alert => {
      this.alert = alert;
      setTimeout(() => {
        this.alert = undefined;
      }, 6000);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
