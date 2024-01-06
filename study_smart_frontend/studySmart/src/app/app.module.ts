import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecksListComponent } from './components/decks-list/decks-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
    SettingsDialogComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
