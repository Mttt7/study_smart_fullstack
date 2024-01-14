import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashcardDeckService } from '../../services/flashcard-deck.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.scss'
})
export class DeckFormComponent {


  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private flashcardDeckService: FlashcardDeckService, private _snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      dayLimit: ['', [Validators.required, Validators.min(1), Validators.max(10000)]]
    });
  }

  get name() { return this.myForm.get('name'); }
  get dayLimit() { return this.myForm.get('dayLimit'); }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      alert("Please fill out all fields correctly");
      return
    }
    let snackBarRef = this._snackBar.open('Flashcard Deck Added!', 'Ok', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
    this.userService.getUserId().subscribe(
      (userId) => {
        this.flashcardDeckService.createDeck(this.name?.value, this.dayLimit?.value, userId).subscribe()
      })

  }


}
