import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {

          this.router.navigate([], { queryParams: { error: 'Unauthorized' } });
        } else if (error.status === 404) {
          // Obsługa błędu braku znalezienia zasobu
          // Możesz przekierować użytkownika do strony 404, wyświetlić komunikat itp.
        } else {
          // Obsługa innych błędów
          console.error('Server error:', error);
        }

        // Rzuć ponownie błąd, aby przekazać go dalej
        return throwError(error);
      })
    );
  }
}
