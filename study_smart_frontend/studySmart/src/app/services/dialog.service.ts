import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from '../components/dialogs/delete-dialog/delete-dialog.component';
import { ChangeNameDialogComponent } from '../components/dialogs/change-name-dialog/change-name-dialog.component';
import { AddFlashcardDialogComponent } from '../components/dialogs/add-flashcard-dialog/add-flashcard-dialog.component';
import { EditFlashcardComponent } from '../components/dialogs/edit-flashcard/edit-flashcard.component';
import { SettingsDialogComponent } from '../components/dialogs/settings-dialog/settings-dialog.component';

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

  openEditFlashcardDialog(frontContent: string, backContent: string) {
    const dialogRef: MatDialogRef<EditFlashcardComponent> = this.dialog.open(EditFlashcardComponent, {
      width: '600px',
      data: {
        frontContent: frontContent,
        backContent: backContent
      }

    });
    return dialogRef.afterClosed();
  }
  openSettingsDialog(dayLimit: number) {
    const dialogRef: MatDialogRef<SettingsDialogComponent> = this.dialog.open(SettingsDialogComponent, {
      width: '400px',
      data: {
        dayLimit: dayLimit
      }

    });
    return dialogRef.afterClosed();
  }
}
