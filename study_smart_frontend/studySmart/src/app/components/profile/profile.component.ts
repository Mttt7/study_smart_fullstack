import { Component, Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  isAuthenticated: boolean = false;
  userFullName: string = '';
  userEmail: string = '';

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    //Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    )
  }
  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
          this.userEmail = res.email as string;

        }
      )
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
