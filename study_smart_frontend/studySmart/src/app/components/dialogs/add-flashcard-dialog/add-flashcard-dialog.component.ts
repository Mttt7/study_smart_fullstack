import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-flashcard-dialog',
  templateUrl: './add-flashcard-dialog.component.html',
  styleUrl: './add-flashcard-dialog.component.scss'
})
export class AddFlashcardDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddFlashcardDialogComponent>) { }

  closeDialog(result: any): void {
    this.dialogRef.close(result);
  }
}
