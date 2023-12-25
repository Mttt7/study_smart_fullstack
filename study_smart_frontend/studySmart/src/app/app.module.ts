import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecksListComponent } from './components/decks-list/decks-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';


import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChangeNameDialogComponent } from './components/dialogs/change-name-dialog/change-name-dialog.component';
import { DeckDetailsComponent } from './components/deck-details/deck-details.component';
import { AddFlashcardDialogComponent } from './components/dialogs/add-flashcard-dialog/add-flashcard-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DecksListComponent,
    DeckFormComponent,
    DeleteDialogComponent,
    ChangeNameDialogComponent,
    DeckDetailsComponent,
    AddFlashcardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
