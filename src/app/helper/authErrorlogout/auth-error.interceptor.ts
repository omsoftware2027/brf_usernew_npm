import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router ,
    @Inject(DOCUMENT) private document: Document,) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) { 
        // auto logout if 401 response returned from api
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        this.router.navigate(['/email-signup']);
        if (document.referrer.toString().includes('/email-signup')) {
          return throwError('Not Authorized');
        } else {
        // this.document.location.href = `${environment.website}/home`;
        }
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
     }


    ));
  }
}
