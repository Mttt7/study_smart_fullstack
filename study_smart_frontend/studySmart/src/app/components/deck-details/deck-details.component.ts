import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardDeckService } from '../../services/flashcard-deck.service';
import { Flashcard } from '../../models/Flashcard';
import { FlashcardsPaginatedResponse } from '../../models/FlashcardsPaginatedResponse';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlashcardService } from '../../services/flashcard.service';
import { FlashcardPayload } from '../../models/FlashcardPayload';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent {





  pageSize: number = 5;
  deckId: number = -1;
  flashcards: Flashcard[] = [];
  showFlashcards: boolean = false;
  currentPage: number = 0;
  length: number = 0



  constructor(private route: ActivatedRoute,
    private flashcardDeckService: FlashcardDeckService,
    private dialogService: DialogService,
    private _snackBar: MatSnackBar,
    private flashcardService: FlashcardService) { }

  ngOnInit(): void {
    this.deckId = Number(this.route.snapshot.params["id"]);
    this.getFlashcardsList(this.deckId);

  }
  getFlashcardsList(id: any) {
    this.flashcardDeckService.getFlashcardsByDeckIdPaginate(id,
      this.currentPage,
      this.pageSize).subscribe(this.proccessResult())
  }

  proccessResult() {
    return (data: any) => {
      this.flashcards = data.content as Flashcard[];
      this.length = data.totalElements;

    }
  }


  getStatusOfFlashcard(flashcard: Flashcard): string {
    if (flashcard.status === -1) return '🔵'
    if (flashcard.status === 0 && flashcard.score + flashcard.previousScore <= 1) return '🔴'
    if (flashcard.status === 0 && flashcard.score + flashcard.previousScore >= 1 && flashcard.score + flashcard.previousScore <= 4) return '🟠'

    if (flashcard.status === 0 && flashcard.score + flashcard.previousScore >= 4) return '🟡'
    if (flashcard.status === 1) return '🟢'
    return '';
  }


  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
    this.getFlashcardsList(this.deckId);
  }


  addFlashcard() {
    this.dialogService.openAddFlashcardDialog().subscribe(
      result => {
        if (result !== undefined && result?.frontContent.trim() != '' && result?.backContent.trim() != '') {
          const flashcardPayload: FlashcardPayload = new FlashcardPayload(result?.frontContent.trim(), result?.backContent.trim())
          this.flashcardDeckService.addFlashcardToDeck(this.deckId, flashcardPayload).subscribe(() => {
            let snackBarRef = this._snackBar.open('Flashcard Added', 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            this.getFlashcardsList(this.deckId)

          })

        }
      }
    )
  }

  editFlashcard(flashcard: Flashcard) {
    this.dialogService.openEditFlashcardDialog(flashcard.frontContent, flashcard.backContent).subscribe(
      result => {

        if (result !== undefined && result?.frontContent.trim() != '' && result?.backContent.trim() != '') {
          const flascardPayload = new FlashcardPayload(result.frontContent.trim(), result.backContent.trim())
          this.flashcardService.updateFlashcard(flashcard, flascardPayload).subscribe(
            data => {
              let snackBarRef = this._snackBar.open('Flashcard Edited', 'Ok', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              })
              this.getFlashcardsList(this.deckId)

            })
        }
      })
  }
  deleteFlashcard(flashcard: Flashcard) {
    this.dialogService.openDeleteDialog().subscribe(
      result => {
        if (result == 'delete') {
          this.flashcardService.deleteFlashcardById(flashcard.id).subscribe(() => {
            let snackBarRef = this._snackBar.open('Flashcard  Deleted!', 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            this.getFlashcardsList(this.deckId);

          })

        }
      }
    )
  }
  toggleFlashcards() {
    this.showFlashcards = !this.showFlashcards;
  }
  showSettings() {
    this.flashcardDeckService.getDeckById(this.deckId).subscribe(
      data => {

        this.dialogService.openSettingsDialog(data.dayLimit).subscribe(
          result => {
            result = Number(result)
            if (result > 0) {
              this.flashcardDeckService.changeDayLimit(this.deckId, result).subscribe(
                () => { }
              )
            } else {
              let snackBarRef = this._snackBar.open('Day limit must be greater than 0', 'Ok', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              })
            }
          }
        )
      }
    )
  }
}
