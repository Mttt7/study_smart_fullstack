import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecksListComponent } from './components/decks-list/decks-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChangeNameDialogComponent } from './components/dialogs/change-name-dialog/change-name-dialog.component';
import { DeckDetailsComponent } from './components/deck-details/deck-details.component';
import { AddFlashcardDialogComponent } from './components/dialogs/add-flashcard-dialog/add-flashcard-dialog.component';
import { EditFlashcardComponent } from './components/dialogs/edit-flashcard/edit-flashcard.component';
import { StudySessionComponent } from './components/study-session/study-session.component';
import { SettingsDialogComponent } from './components/dialogs/settings-dialog/settings-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import appConfig from '../config/app-config';
import OktaAuth from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';


const oktaConfig = appConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);



@NgModule({
  declarations: [
    AppComponent,
    DecksListComponent,
    DeckFormComponent,
    DeleteDialogComponent,
    ChangeNameDialogComponent,
    DeckDetailsComponent,
    AddFlashcardDialogComponent,
    EditFlashcardComponent,
    StudySessionComponent,
    SettingsDialogComponent,
    LoginComponent,
    LoginStatusComponent,
    ProfileComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    FormsModule,
    OktaAuthModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
