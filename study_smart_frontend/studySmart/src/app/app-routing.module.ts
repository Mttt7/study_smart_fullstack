import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DecksListComponent } from './components/decks-list/decks-list.component';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { DeckDetailsComponent } from './components/deck-details/deck-details.component';
import { StudySessionComponent } from './components/study-session/study-session.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import OktaAuth from '@okta/okta-auth-js';

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  //use injector to access any service available in the app
  const router = injector.get(Router);
  //redirect the user to the our custom login page
  router.navigate(['/login']);
}


const routes: Routes = [
  {
    path: 'decks', component: DecksListComponent, canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage }
  },
  {
    path: 'addDeck', component: DeckFormComponent, canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage }
  },
  {
    path: 'deck/:id', component: DeckDetailsComponent, canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage }
  },

  {
    path: 'deck/:id/:error', component: DeckDetailsComponent, canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage }
  },
  {
    path: 'deck/:id/session', component: StudySessionComponent, canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage }
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage }
  },

  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
