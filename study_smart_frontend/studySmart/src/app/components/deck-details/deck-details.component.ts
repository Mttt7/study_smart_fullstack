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
import { AddFlashcardPayload } from '../../models/AddFlashcardPayload';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent {




  pageSize: number = 5;
  deckId: number = -1;
  flashcards: Flashcard[] = [];
  showFlashcards: boolean = true;
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
    if (flashcard.status === -1) return 'blue'
    if (flashcard.status === 0) return 'yellow'
    if (flashcard.status === 0 && flashcard.score + flashcard.previousScore <= 1) return 'red'

    if (flashcard.status === 0 && flashcard.score + flashcard.previousScore >= 4) return 'yellow'
    if (flashcard.status === 1) return 'green'
    return '';
  }


  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
    this.getFlashcardsList(this.deckId);
  }


  addFLashcard() {
    this.dialogService.openAddFlashcardDialog().subscribe(
      result => {
        if (result !== undefined && result?.frontContent.trim() != '' && result?.backContent.trim() != '') {
          const flashcardPayload: AddFlashcardPayload = new AddFlashcardPayload(result?.frontContent.trim(), result?.backContent.trim())
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

  editFlashcard(_t25: Flashcard) {
    throw new Error('Method not implemented.');
  }
  deleteFlashcard(_t25: Flashcard) {
    throw new Error('Method not implemented.');
  }
  toggleFlashcards() {
    this.showFlashcards = !this.showFlashcards;
  }
}
