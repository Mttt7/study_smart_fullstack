import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Observable, from, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const theEndpoint = 'http://localhost:5000/api';
    const securedEndpoints = [theEndpoint];

    if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {
      const accessToken = this.oktaAuth.getAccessToken();

      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });

    }

    return await lastValueFrom(next.handle(request));
    // next.handle(request): W kontekście interceptora, 
    //next reprezentuje kolejny interceptor w łańcuchu lub
    // OSTATECZNE WYSŁANIE RZĄDANIA DO  do serwera, jeśli nie ma 
    //więcej interceptorów. Metoda handle przyjmuje obiekt
    //  żądania (HttpRequest) i zwraca Observable reprezentujący przepływ odpowiedzi.
  }
}
