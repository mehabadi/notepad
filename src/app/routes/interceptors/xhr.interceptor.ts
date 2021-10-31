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
