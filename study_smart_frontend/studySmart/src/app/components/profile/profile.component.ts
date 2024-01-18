import { Component, Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { UserService } from '../../services/user.service';
import { FlashcardDeckService } from '../../services/flashcard-deck.service';
import { FlashcardService } from '../../services/flashcard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


  isAuthenticated: boolean = false;
  userFullName: string = '';
  userEmail: string = '';
  oktaId: string = '';
  id: number = -1;
  decksCount: number = 0;
  flashcardsCount: number = 0;

  constructor(private oktaAuthService: OktaAuthStateService, private flashcardService: FlashcardService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private userService: UserService, private flashcardDeckService: FlashcardDeckService) { }

  ngOnInit(): void {
    //Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    )



  }
  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
          this.userEmail = res.email as string;
          this.oktaId = res.sub as string;
          this.userService.getUserId(this.oktaId).subscribe(
            (id) => {
              this.id = id;
              this.flashcardDeckService.countUserDecks(this.id).subscribe(
                (count) => {
                  this.decksCount = count;
                }
              )
              this.flashcardDeckService.countUserFlashcards(this.id).subscribe(
                (count) => {
                  this.flashcardsCount = count;
                }
              )
            }
          )
        }
      )
    }
  }

  logout() {
    this.userService.logout();
  }

  downloadCsv() {
    this.flashcardService.downloadAllFlashcardsAsCsv(this.id).subscribe((response) => {
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split(';')[1].trim().split('=')[1]
        : 'employees.csv';

      const blob = new Blob([response.body as BlobPart], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    });
  }
}

