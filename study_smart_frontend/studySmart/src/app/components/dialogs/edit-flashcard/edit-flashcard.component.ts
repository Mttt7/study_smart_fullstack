import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-edit-flashcard',
  templateUrl: './edit-flashcard.component.html',
  styleUrl: './edit-flashcard.component.scss'
})
export class EditFlashcardComponent {



  constructor(public dialogRef: MatDialogRef<EditFlashcardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { frontContent: string, backContent: string }) { }

  closeDialog(result: any): void {
    this.dialogRef.close(result);
  }
}
