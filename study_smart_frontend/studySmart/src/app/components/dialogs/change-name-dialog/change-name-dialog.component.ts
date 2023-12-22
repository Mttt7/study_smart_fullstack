import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-name-dialog',
  templateUrl: './change-name-dialog.component.html',
  styleUrl: './change-name-dialog.component.scss'
})
export class ChangeNameDialogComponent {
  constructor(public dialogRef: MatDialogRef<ChangeNameDialogComponent>) { }

  closeDialog(result: any): void {
    this.dialogRef.close(result);
  }
}
