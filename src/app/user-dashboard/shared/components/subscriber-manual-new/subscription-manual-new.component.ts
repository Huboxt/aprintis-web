import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-subscription-manual-new',
  templateUrl: './subscription-manual-new.component.html',
})
export class SubscriberManualNewComponent {
  newManualSubscriberForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SubscriberManualNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private formBuilder: FormBuilder
  ) {
    this.newManualSubscriberForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  save() {
    this.dialogRef.close(this.newManualSubscriberForm.value);
  }

  addSubscriber() {
    this.dialogRef.close('addSubscriber');
  }

  addManualSubscriberCSV() {
    this.dialogRef.close('addManualSubscriberCSV');
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
