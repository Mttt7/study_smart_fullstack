import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from '../components/dialogs/delete-dialog/delete-dialog.component';
import { ChangeNameDialogComponent } from '../components/dialogs/change-name-dialog/change-name-dialog.component';
import { AddFlashcardDialogComponent } from '../components/dialogs/add-flashcard-dialog/add-flashcard-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDeleteDialog(): Observable<any> {
    const dialogRef: MatDialogRef<DeleteDialogComponent> = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
    });
    return dialogRef.afterClosed();
  }

  openChangeNameDialog(): Observable<any> {
    const dialogRef: MatDialogRef<ChangeNameDialogComponent> = this.dialog.open(ChangeNameDialogComponent, {
      width: '400px',
    });
    return dialogRef.afterClosed();
  }
  openAddFlashcardDialog() {
    const dialogRef: MatDialogRef<AddFlashcardDialogComponent> = this.dialog.open(AddFlashcardDialogComponent, {
      width: '600px',
    });
    return dialogRef.afterClosed();
  }
}
