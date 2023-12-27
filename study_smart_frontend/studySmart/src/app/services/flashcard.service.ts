import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flashcard } from '../models/Flashcard';
import { FlashcardPayload } from '../models/FlashcardPayload';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {



  private flashcardsUrl = 'http://localhost:5000/api/flashcards';

  constructor(private httpClient: HttpClient) { }

  deleteFlashcardById(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.flashcardsUrl}/${id}`)
  }
  updateFlashcard(flashcard: Flashcard, flashcardPayload: FlashcardPayload): Observable<Flashcard> {
    flashcard.frontContent = flashcardPayload.getFrontContent();
    flashcard.backContent = flashcardPayload.getBackContent();
    return this.httpClient.put<Flashcard>(`${this.flashcardsUrl}`, flashcard)
  }

  addScoreToFlashcard(flashcardId: number, score: number): Observable<Flashcard> {
    console.log("addScoreToFlashcard")
    console.log(flashcardId)
    console.log(score)
    return this.httpClient.patch<Flashcard>(`${this.flashcardsUrl}/${flashcardId}/addScore?score=${score}`, null)
  }
}
