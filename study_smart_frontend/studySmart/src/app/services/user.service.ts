import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Observable, from, last, mergeMap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  oktaId: string = '';
  //id: number = -1;
  userUrl = 'http://localhost:5000/api/profiles';

  constructor(private httpClient: HttpClient,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private oktaAuthService: OktaAuthStateService,
  ) { }


  getUserId(_oktaId?: string): Observable<number> {

    if (!_oktaId) {
      return from(this.oktaAuth.getUser()).pipe(
        mergeMap((res) => {
          this.oktaId = res.sub as string;
          return this.httpClient.get<number>(`${this.userUrl}/oktaId/${this.oktaId}`);
        }),
        last()
      );
    } else {
      return this.httpClient.get<number>(`${this.userUrl}/oktaId/${_oktaId}`);
    }

  }

  logout() {
    this.oktaAuth.signOut();
  }


}
