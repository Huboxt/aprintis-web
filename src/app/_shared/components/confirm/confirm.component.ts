import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      msg: string;
      title?: string;
      okBtnTxt: string;
      diffCancelCloseValue?: boolean;
      cancelBtnTxt: string;
    }
  ) {}

  onCancelClick(cancelPressed: boolean): void {
    this.dialogRef.close(cancelPressed ? 'cancel' : 'close');
  }
}
