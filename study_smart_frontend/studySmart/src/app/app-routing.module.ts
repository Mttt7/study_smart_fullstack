import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecksListComponent } from './components/decks-list/decks-list.component';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { DeckDetailsComponent } from './components/deck-details/deck-details.component';

const routes: Routes = [
  { path: 'decks', component: DecksListComponent },
  { path: 'addDeck', component: DeckFormComponent },
  { path: 'deck/:id', component: DeckDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
