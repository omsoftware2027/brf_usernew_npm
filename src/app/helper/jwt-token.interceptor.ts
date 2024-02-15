import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var l = request.url.split('/');
    const ddd= l[l.length - 1];
    if(ddd !='login'){
      const currentUser = localStorage.getItem('token');
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser}`
          }
        });
      }
      return next.handle(request);
    } else {
     return next.handle(request);
    }
  }
}
