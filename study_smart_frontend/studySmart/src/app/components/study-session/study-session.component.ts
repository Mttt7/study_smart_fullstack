import { Component } from '@angular/core';
import { FlashcardDeckService } from '../../services/flashcard-deck.service';
import { Flashcard } from '../../models/Flashcard';
import { SubdeckService } from '../../services/subdeck.service';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../../services/flashcard.service';

@Component({
  selector: 'app-study-session',
  templateUrl: './study-session.component.html',
  styleUrl: './study-session.component.scss'
})
export class StudySessionComponent {


  deckId: number = -1;
  subdeckId: number = -1;
  size: number = 3;
  subdeck: Flashcard[] = [];
  currentFlashcardId: number = 0;
  backShown: boolean = false;

  constructor(private flashcardDeckService: FlashcardDeckService,
    private subdeckService: SubdeckService, private route: ActivatedRoute,
    private flashcardService: FlashcardService) { }
  ngOnInit(): void {
    this.getSubdeck();


  }

  getSubdeck() {
    this.deckId = Number(this.route.snapshot.params["id"]);
    this.flashcardDeckService.getSubdeckByDeckId(this.deckId, this.size).subscribe(
      data => {
        this.subdeckId = data.id;
        this.subdeckService.getFlashcardsBySubdeckId(this.subdeckId).subscribe(
          data => {
            this.subdeck = data as Flashcard[];
            console.log(this.subdeck);
          }
        )
      }
    )
  }

  getCurrentFlashcard() {
    return this.subdeck[this.currentFlashcardId];
  }

  addScore(score: number) {
    if (score === 3 && this.getCurrentFlashcard().score === 3 && this.getCurrentFlashcard().previousScore === 3) {
      console.log("!!!!!!!!")
      this.getSubdeck();
    }
    this.flashcardService.addScoreToFlashcard(this.getCurrentFlashcard().id, score).subscribe(
      () => {
        this.proceedNextFlashcardId();
      }

    )
  }
  showBack() {
    this.backShown = true;
  }

  proceedNextFlashcardId() {
    let length = this.subdeck.length;
    let nextId = Math.floor(Math.random() * length);
    this.currentFlashcardId = nextId;
    this.backShown = false;
  }




}
