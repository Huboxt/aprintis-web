
import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Review } from '_models';

@Component({
  selector: 'app-review-dialog',
  templateUrl: 'review-dialog.component.html',
})
export class ReviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Review) {}

  close(): void {
    this.dialogRef.close();
  }
}
