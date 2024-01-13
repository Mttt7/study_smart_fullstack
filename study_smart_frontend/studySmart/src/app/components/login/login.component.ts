import { Component, Inject } from '@angular/core';
import appConfig from '../../../config/app-config';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  oktaSignin: any;


  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      features: { registration: true },
      //baseUrl: myAppConfig.oidc.issuer,
      baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
      clientId: appConfig.oidc.clientId,
      redirectUri: appConfig.oidc.redirectUri,
      useClassicEngine: true,
      authParams: {
        pkce: true,
        issuer: appConfig.oidc.issuer,
        scopes: appConfig.oidc.scopes
      }
    });
  }


  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'
    }, //name has to match the id in the html

      (response: any) => {

        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    )

  }

}
