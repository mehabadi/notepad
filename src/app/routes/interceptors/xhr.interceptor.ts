import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class XhrInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xhr = req.clone({
      setHeaders: {
        'Authorization': 'token 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',
      }
    });
    return next.handle(xhr);
  }
}
