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
      // if (err.status === 401) { 
      //   localStorage.removeItem('Id');
      //   localStorage.removeItem('token');
      //   this.router.navigate(['/login']);
      //   if (document.referrer.toString().includes('/login')) {
      //     return throwError('Not Authorized');
      //   } else {
      //   }
      // }
      const error = err.error.message || err.statusText;
      return throwError(error);
     }


    ));
  }
}
