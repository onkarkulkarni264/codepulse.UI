import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('addAuth=true')) {
      //debugger;
      const token = this.cookieService.get('Authorization');
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `${token}`
          }
        });
      }
    }
    return next.handle(request);
  }
}
