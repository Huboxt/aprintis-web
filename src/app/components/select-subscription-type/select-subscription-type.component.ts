import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-select-subscription-type',
  templateUrl: './select-subscription-type.component.html',
  styleUrls: ['./select-subscription-type.component.scss']
})
export class SelectSubscriptionTypeComponent implements OnInit, OnDestroy {
  subscriptions;

  constructor(public dialogRef: MatDialogRef<SelectSubscriptionTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              ) {
  }

  ngOnInit() {
    this.subscriptions = this.data.subscriptions;
  }

  selectSubscription(subscription) {
    this.dialogRef.close(subscription);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
  }

}
