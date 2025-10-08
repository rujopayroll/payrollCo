import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, public _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({ withCredentials: true });
    const maxRetries = 1;

    return next.handle(clonedRequest).pipe(
      //retry(maxRetries),
      catchError((error: HttpErrorResponse) => { // ⬅ Forzamos el tipo aquí
        const maxRetries1 = 1;
        if (error.status === 401) {
          this.authService.logout();
          return this.authService.renuevaToken().pipe(
            switchMap(() => next.handle(clonedRequest)),
          );
        }
        return throwError(() => error); // ⬅ Convertimos el tipo
      })
    );
  }
}
