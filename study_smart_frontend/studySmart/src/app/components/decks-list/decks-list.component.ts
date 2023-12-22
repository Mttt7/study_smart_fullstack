import { Component } from '@angular/core';
import { FlashcardDeck } from '../../models/FlashcardDeck';
import { FlashcardDeckService } from '../../services/flashcard-deck.service';
import { DialogService } from '../../services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decks-list',
  templateUrl: './decks-list.component.html',
  styleUrl: './decks-list.component.scss'
})
export class DecksListComponent {



  decks: FlashcardDeck[] = [];

  constructor(private flashcardDeckService: FlashcardDeckService,
    private dialogService: DialogService, private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.getFlashcardDeckList();
  }

  getFlashcardDeckList() {
    this.flashcardDeckService.getDeckListByUserId(1).subscribe(
      (data) => {
        this.decks = data as FlashcardDeck[];
      }
    )
  }



  deleteDeck(deck: FlashcardDeck) {
    this.dialogService.openDeleteDialog().subscribe(
      result => {
        if (result == 'delete') {
          this.flashcardDeckService.deleteDeck(deck.id).subscribe(() => {
            let snackBarRef = this._snackBar.open('Flashcard Deck Deleted!', 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            this.getFlashcardDeckList();

          })

        }
      }
    )
  }
  renameDeck(deck: FlashcardDeck) {
    this.dialogService.openChangeNameDialog().subscribe(
      result => {
        if (result != 'cancel') {
          let allowedCharsRegex = /^[a-zA-Z0-9\-]+$/;
          if (result.trim() == '' || !allowedCharsRegex.test(result)) {
            let snackBarRef = this._snackBar.open(`Bad New Name!`, 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            return
          }

          this.flashcardDeckService.changeDeckName(deck.id, result).subscribe(() => {
            let snackBarRef = this._snackBar.open(`Name Changed to: ${result}`, 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            this.getFlashcardDeckList();

          })

        }
      }
    )

  }
}
