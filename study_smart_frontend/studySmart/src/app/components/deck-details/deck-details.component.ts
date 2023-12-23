import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardDeckService } from '../../services/flashcard-deck.service';
import { Flashcard } from '../../models/Flashcard';
import { FlashcardsPaginatedResponse } from '../../models/FlashcardsPaginatedResponse';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

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
    private flashcardDeckService: FlashcardDeckService) { }

  ngOnInit(): void {
    this.deckId = Number(this.route.snapshot.params["id"]);
    this.getDeckList(this.deckId);

  }
  getDeckList(id: any) {
    this.flashcardDeckService.getFlashcardsByDeckIdPaginate(id,
      this.currentPage,
      this.pageSize).subscribe(this.proccessResult())
  }

  proccessResult() {
    return (data: any) => {
      this.flashcards = data.content as Flashcard[];
      this.length = data.totalElements;
      console.log(data)
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
    this.getDeckList(this.deckId);
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
