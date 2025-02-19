import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const cloned = req.clone();
  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMsg = `${
        error.error.message ||
        'Falha na comunicação com o servidor. Tente novamente!'
      }`;

      return throwError(() => errorMsg);
    }),
  );
};
