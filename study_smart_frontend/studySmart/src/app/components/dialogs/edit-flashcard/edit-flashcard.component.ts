import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-flashcard',
  templateUrl: './edit-flashcard.component.html',
  styleUrl: './edit-flashcard.component.scss'
})
export class EditFlashcardComponent {

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

  constructor(public dialogRef: MatDialogRef<EditFlashcardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { frontContent: string, backContent: string }) { }

  ngOnInit(): void {
    this.htmlContent1 = this.data.frontContent;
    this.htmlContent2 = this.data.backContent;
  }

  closeDialog(result: any): void {
    this.dialogRef.close(result);
  }

}
