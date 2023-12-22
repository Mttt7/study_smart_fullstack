import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashcardDeck } from '../models/FlashcardDeck';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardDeckService {


  private decksUrl = 'http://localhost:5000/api/decks';
  private usersUrl = 'http://localhost:5000/api/profiles';


  constructor(private httpClient: HttpClient) { }

  getDeckListByUserId(userId: number): Observable<FlashcardDeck[]> {
    //1 now is hardcoded
    //get userId from userSService
    return this.httpClient.get<FlashcardDeck[]>(`${this.usersUrl}/1/decks`)
  }

  createDeck(name: String, dayLimit: number): Observable<FlashcardDeck> {
    //1 now is hardcoded
    //get userId from userSService
    let createDeckPayload = { userProfileId: 1, name: name, dayLimit: dayLimit } as CreateDeckPayload

    return this.httpClient.post<FlashcardDeck>(`${this.decksUrl}/`, createDeckPayload)
  }

  changeDeckName(id: number, name: String): Observable<FlashcardDeck> {
    return this.httpClient.patch<FlashcardDeck>(`${this.decksUrl}/${id}`, { name: name })
  }

  deleteDeck(id: number): Observable<any> {
    return this.httpClient.delete(`${this.decksUrl}/${id}`)
  }

}

interface CreateDeckPayload {
  userProfileId: number;
  name: String;
  dayLimit: number;
}
