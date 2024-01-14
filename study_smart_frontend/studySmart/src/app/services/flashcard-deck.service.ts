import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashcardDeck } from '../models/FlashcardDeck';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Flashcard } from '../models/Flashcard';
import { FlashcardsPaginatedResponse } from '../models/FlashcardsPaginatedResponse';
import { FlashcardDecksPaginatedResponse } from '../models/FlashcardDecksPaginatedResponse';
import { FlashcardPayload } from '../models/FlashcardPayload';
import { SubdeckResponse } from '../models/SubdeckResponse';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardDeckService {





  private decksUrl = 'http://localhost:5000/api/decks';
  private usersUrl = 'http://localhost:5000/api/profiles';

  constructor(private httpClient: HttpClient, userService: UserService) { }

  getDeckById(id: number): Observable<FlashcardDeck> {
    return this.httpClient.get<FlashcardDeck>(`${this.decksUrl}/${id}`)
  }


  getDeckListByUserId(userId: number): Observable<FlashcardDeck[]> {
    return this.httpClient.get<FlashcardDeck[]>(`${this.usersUrl}/${userId}/decks`)
  }

  getDeckListByUserIdPaginate(userId: number, pageNumber: number, pageSize: number): Observable<FlashcardDecksPaginatedResponse> {
    return this.httpClient.get<FlashcardDecksPaginatedResponse>(`${this.usersUrl}/${userId}/decks/paginated?page=${pageNumber}&size=${pageSize}`)
  }

  createDeck(name: String, dayLimit: number, userId: number): Observable<FlashcardDeck> {
    let createDeckPayload = { userProfileId: userId, name: name, dayLimit: dayLimit } as CreateDeckPayload

    return this.httpClient.post<FlashcardDeck>(`${this.decksUrl}/`, createDeckPayload)
  }

  changeDeckName(id: number, name: String): Observable<FlashcardDeck> {
    return this.httpClient.patch<FlashcardDeck>(`${this.decksUrl}/${id}`, { name: name })
  }

  deleteDeck(id: number): Observable<any> {
    return this.httpClient.delete(`${this.decksUrl}/${id}`)
  }

  getFlashcardsByDeckIdPaginate(deckId: number, pageNumber: number, pageSize: number): Observable<FlashcardsPaginatedResponse> {
    return this.httpClient.get<FlashcardsPaginatedResponse>(`${this.decksUrl}/${deckId}/flashcards/paginated?page=${pageNumber}&size=${pageSize}`)
  }

  addFlashcardToDeck(id: any, flashcardPayload: FlashcardPayload): Observable<Flashcard> {

    return this.httpClient.post<Flashcard>(`${this.decksUrl}/${id}/flashcards`, flashcardPayload)
  }

  getSubdeckByDeckId(deckId: number): Observable<SubdeckResponse> {
    return this.httpClient.get<SubdeckResponse>(`${this.decksUrl}/${deckId}/subdeck`)
  }

  changeDayLimit(deckId: number, dayLimit: number): Observable<FlashcardDeck> {
    return this.httpClient.patch<FlashcardDeck>(`${this.decksUrl}/${deckId}/changeDayLimit?dayLimit=${dayLimit}`, null)
  }

  resetScore(deckId: number, type: string): Observable<Flashcard[]> {
    return this.httpClient.patch<Flashcard[]>(`${this.decksUrl}/${deckId}/resetScore?type=${type}`, null)
  }

}

interface CreateDeckPayload {
  userProfileId: number;
  name: String;
  dayLimit: number;
}


