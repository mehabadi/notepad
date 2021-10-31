import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-stats',
  templateUrl: './view-stats.component.html'
})
export class ViewStatsComponent{

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  back() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
