import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-select-sponsorship-level',
  templateUrl: './select-sponsorship-level.component.html',
  styleUrls: ['./select-sponsorship-level.component.scss']
})
export class SelectSponsorshipLevelComponent implements OnInit, OnDestroy {
  donations;

  constructor(public dialogRef: MatDialogRef<SelectSponsorshipLevelComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {
    this.donations = this.data.donations;
  }

  selectSponsorship(sponsorship) {
    this.dialogRef.close(sponsorship);
  }

  getSponsorshipContent(str: string) {
    if (str === 'Custom amount') {
      return 'An amount of your choice';
    } else {
      return str;
    }
  }

  ngOnDestroy() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
