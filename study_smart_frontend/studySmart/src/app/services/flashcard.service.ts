import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flashcard } from '../models/Flashcard';
import { FlashcardPayload } from '../models/FlashcardPayload';
import { FlashcardDeckService } from './flashcard-deck.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {



  private flashcardsUrl = 'http://localhost:5000/api/flashcards';

  constructor(private httpClient: HttpClient,
    private flashcardDeckService: FlashcardDeckService) { }

  getFlashcardById(id: number): Observable<Flashcard> {
    return this.httpClient.get<Flashcard>(`${this.flashcardsUrl}/${id}`)
  }

  deleteFlashcardById(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.flashcardsUrl}/${id}`)
  }
  updateFlashcard(flashcard: Flashcard, flashcardPayload: FlashcardPayload): Observable<Flashcard> {
    flashcard.frontContent = flashcardPayload.getFrontContent();
    flashcard.backContent = flashcardPayload.getBackContent();
    return this.httpClient.put<Flashcard>(`${this.flashcardsUrl}`, flashcard)
  }

  addScoreToFlashcard(flashcardId: number, score: number): Observable<Flashcard> {
    return this.httpClient.post<Flashcard>(`${this.flashcardsUrl}/${flashcardId}/addScore?score=${score}`, null)
  }


  downloadAllFlashcardsAsCsv(id: number): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/csv',
    });
    return this.httpClient.get(`${this.flashcardsUrl}/getCsv/${id}`, {
      headers,
      responseType: 'blob',
      observe: 'response',
    });

  }

}


