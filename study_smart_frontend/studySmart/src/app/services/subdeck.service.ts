import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flashcard } from '../models/Flashcard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubdeckService {

  subdeckUrl = 'http://localhost:5000/api/subdeck';

  constructor(private httpClient: HttpClient) { }

  getFlashcardsBySubdeckId(id: number): Observable<Flashcard[]> {
    return this.httpClient.get<Flashcard[]>(`${this.subdeckUrl}/${id}/flashcards`)
  }


}
