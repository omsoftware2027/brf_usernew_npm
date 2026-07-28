import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    @Inject(DOCUMENT) private document: Document,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(
      err => {
        if (err.status === 401) {
          this.authService.clearToken();
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('id');
            this.router.navigate(['/email-signup']);
            if (document.referrer.includes('/email-signup')) {
              return throwError(() => new Error('Not Authorized'));
            }
            // window.location.href = `${environment.website}/home`;
          }
          return throwError(() => err);
        }
        return throwError(() => err);
      })
    );
  }
}
