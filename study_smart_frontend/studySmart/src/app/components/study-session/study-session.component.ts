import { Component, HostListener } from '@angular/core';
import { FlashcardDeckService } from '../../services/flashcard-deck.service';
import { Flashcard } from '../../models/Flashcard';
import { SubdeckService } from '../../services/subdeck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../../services/flashcard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  reviewedToday: number = 0;
  dayLimit: number = 0
  progressBarValue: number = 10;
  goalCompleted: boolean = false;


  constructor(private flashcardDeckService: FlashcardDeckService,
    private subdeckService: SubdeckService, private route: ActivatedRoute,
    private flashcardService: FlashcardService, private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.updateSubdeck();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.currentFlashcardId === -1) {
      if (event.key === ' ') { this.router.navigate([`/deck/${this.deckId}`]); }
      if (event.key === 'Escape') { this.router.navigate([`/deck/${this.deckId}`]); }
    }
    else {
      if (event.key === ' ') { this.showBack(); }
      if (event.key === 'Escape') { this.router.navigate([`/deck/${this.deckId}`]); }

      if (this.backShown) {
        if (event.key === '1') { this.addScore(0); }
        if (event.key === '2') { this.addScore(1); }
        if (event.key === '3') { this.addScore(2); }
        if (event.key === '4') { this.addScore(3); }
      }
    }
  }


  updateSubdeck() {
    this.deckId = Number(this.route.snapshot.params["id"]);
    this.flashcardDeckService.getSubdeckByDeckId(this.deckId).subscribe(
      data => {
        this.subdeckId = data.id;
        this.subdeckService.getFlashcardsBySubdeckId(this.subdeckId).subscribe(
          data => {
            this.subdeck = data as Flashcard[];
            this.proceedNextFlashcardId();
          }
        )
      }
    )
  }

  addScore(score: number) {
    let id = this.subdeck[this.currentFlashcardId].id;
    this.flashcardService.addScoreToFlashcard(id, score).subscribe(
      () => {
        this.updateSubdeck();
      }
    )
  }
  showBack() {
    this.backShown = true;
  }

  proceedNextFlashcardId() {
    let length = this.subdeck.length;
    if (length == 0) {
      this.currentFlashcardId = -1;
      return;
    }
    this.updateProgressBar();

    let nextId = Math.floor(Math.random() * length);
    this.currentFlashcardId = nextId;
    this.backShown = false;
  }


  updateProgressBar() {
    this.flashcardDeckService.getDeckById(this.deckId).subscribe(
      data => {
        this.reviewedToday = data.reviewedToday;
        this.dayLimit = data.dayLimit;
        this.progressBarValue = Math.round((this.reviewedToday / this.dayLimit) * 100);
        if (this.progressBarValue > 99) {
          this.showCompletionInfo();
        }
      }
    )
  }
  showCompletionInfo() {
    if (!this.goalCompleted) {
      let snackBarRef = this._snackBar.open(`Daily Goal Completed!`, 'OK', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
    this.goalCompleted = true;

  }

}
