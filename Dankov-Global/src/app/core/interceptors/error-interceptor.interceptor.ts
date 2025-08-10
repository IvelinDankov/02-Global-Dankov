import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorService } from "../services/error.service.js";
import { catchError, throwError } from "rxjs";

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = "An error occured!";

      if (error.error instanceof ErrorEvent) {
        errorMsg = error.error.message;
      } else {
        errorMsg = error.error?.message || error.message;
      }

      errorService.setError(errorMsg);

      return throwError(() => error);
    })
  );
};
