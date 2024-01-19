import { Component, Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.scss'
})
export class LoginStatusComponent {

  storage: Storage = sessionStorage;

  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private userService: UserService) { }

  ngOnInit(): void {
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

          const theEmail = res.email as string;
          this.storage.setItem('userEmail', JSON.stringify(theEmail))
        }
      )
    }
  }

  logout() {
    this.userService.logout();
  }

}

