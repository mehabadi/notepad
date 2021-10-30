import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AlertService} from "../../core/services/alert.service";
import {AlertTypes} from "../../core/models/alert";

@Injectable({
  'providedIn': 'root'
})
export class ExceptionInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return <any>next.handle(req).pipe(
      catchError(
        (error: any, caught: Observable<HttpEvent<any>>) => {
          let msg = 'Unexpected error occurred';
          switch (error.status) {
            case 401:
              msg = 'Unauthorized';
              break;
            case 403:
              msg = 'Forbidden';
              break;
            case 404:
              msg = 'Not Found';
              break;
            case 500:
              msg = 'Internal Server Error';
              break;
            case 503:
              msg = 'Service Unavailable';
              break;
          }
          this.alertService.show(msg, AlertTypes.DANGER);
          throw error;
        }
      )
    );
  }
}
