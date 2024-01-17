import { Component } from '@angular/core';
import { FlashcardDeck } from '../../models/FlashcardDeck';
import { FlashcardDeckService } from '../../services/flashcard-deck.service';
import { DialogService } from '../../services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlashcardDecksPaginatedResponse } from '../../models/FlashcardDecksPaginatedResponse';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-decks-list',
  templateUrl: './decks-list.component.html',
  styleUrl: './decks-list.component.scss'
})
export class DecksListComponent {

  userId: number = 1;
  pageSize: number = 5;
  currentPage: number = 0;
  length: number = 0
  loading = true;
  decks: FlashcardDeck[] = [];
  searchMode: boolean = false;

  constructor(private flashcardDeckService: FlashcardDeckService,
    private dialogService: DialogService, private _snackBar: MatSnackBar,
    private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listDecks()
  }

  listDecks() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword')

    this.userService.getUserId().subscribe(
      (data) => {
        this.userId = data;
        if (!this.searchMode) {
          this.getDeckList(this.userId);
        }
        else if (this.searchMode) {
          this.route.params.subscribe(
            (params: Params) => {
              this.searchDecks(params['keyword'])
            }
          )
        }

      }
    )
  }


  searchDecks(keyword: string) {

    this.flashcardDeckService.searchDecksPaginate(keyword, this.currentPage, this.pageSize, this.userId,).subscribe(this.proccessResult())
  }

  getDeckList(userId: number) {
    this.flashcardDeckService.getDeckListByUserIdPaginate(userId,
      this.currentPage,
      this.pageSize).subscribe(this.proccessResult())
  }
  proccessResult() {
    return (data: FlashcardDecksPaginatedResponse) => {
      this.loading = false;
      this.decks = data.content as FlashcardDeck[];
      this.length = data.totalElements;
    }
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
    this.getDeckList(this.userId);
  }

  deleteDeck(deck: FlashcardDeck) {
    this.dialogService.openDeleteDialog().subscribe(
      result => {
        if (result == 'delete') {
          this.flashcardDeckService.deleteDeck(deck.id).subscribe(() => {
            let snackBarRef = this._snackBar.open('Flashcard Deck Deleted!', 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            this.getDeckList(this.userId);

          })

        }
      }
    )
  }
  getDailyGoal(deck: FlashcardDeck): string {
    if (deck.reviewedToday == null) return '0%'
    return Math.round((deck.reviewedToday / deck.dayLimit) * 1000) / 10 + '%'
  }
  renameDeck(deck: FlashcardDeck) {
    this.dialogService.openChangeNameDialog().subscribe(
      result => {
        if (result != 'cancel') {
          let allowedCharsRegex = /^[a-zA-Z0-9\-]+$/;
          if (result.trim() == '' || !allowedCharsRegex.test(result)) {
            let snackBarRef = this._snackBar.open(`Bad New Name!`, 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            return
          }

          this.flashcardDeckService.changeDeckName(deck.id, result).subscribe(() => {
            let snackBarRef = this._snackBar.open(`Name Changed to: ${result}`, 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
            this.getDeckList(this.userId);

          })

        }
      }
    )

  }
}
