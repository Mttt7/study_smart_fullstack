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
import { ChangeNameDialogComponent } from './components/dialogs/change-name-dialog/change-name-dialog.component';



const routes: Routes = [
  { path: 'decks', component: DecksListComponent },
  { path: 'addDeck', component: DeckFormComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    DecksListComponent,
    DeckFormComponent,
    DeleteDialogComponent,
    ChangeNameDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
