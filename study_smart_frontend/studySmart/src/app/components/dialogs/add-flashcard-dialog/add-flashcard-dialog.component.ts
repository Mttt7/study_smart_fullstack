import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-flashcard-dialog',
  templateUrl: './add-flashcard-dialog.component.html',
  styleUrl: './add-flashcard-dialog.component.scss'
})
export class AddFlashcardDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddFlashcardDialogComponent>) { }


  htmlContent1 = '';
  htmlContent2 = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '150px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo',
        'customClasses',

      ]
    ]
  };




  closeDialog(result: any): void {
    this.dialogRef.close(result);
  }

}

