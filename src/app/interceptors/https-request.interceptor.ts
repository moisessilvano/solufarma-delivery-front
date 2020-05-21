import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from 'src/app/api/services/auth.service';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    if (req.url.indexOf('/api') > 0) {

      let headers = new HttpHeaders();

      if (localStorage.getItem('token')) {
        headers = headers.append('x-access-token', localStorage.getItem('token'));
      }

      const request = req.clone({
        headers: headers,
      });

      return next
        .handle(request)
        .pipe(
          tap((ev: HttpEvent<any>) => {
            if (ev instanceof HttpResponse) {
            }
          }),
          catchError(response => {
            if (response instanceof HttpErrorResponse) {
              if (response.status === 401) {
                this.authService.logout();
              }
            }
            return throwError(response);
          })
        );

    }

    return next.handle(req);

  }
}
