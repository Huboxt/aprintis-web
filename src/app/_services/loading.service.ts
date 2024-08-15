import { Injectable, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
// import { LoadingComponent } from '../components';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { LoadingComponent } from '../../app/components/loading/loading.component';

@Injectable({ providedIn: 'root' })
export class LoadingService implements OnDestroy {
  dialogRef: MatDialogRef<LoadingComponent>;

  constructor(private dialog: MatDialog) {}

  showAnimation(title: string, description: string) {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      width: '350px',
      height: '300px',
      data: {
        title,
        description,
      },
      panelClass: 'loading-dialog',
      disableClose: true,
      autoFocus: true,
    });

    this.dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        console.log('Loading dialog was closed');
      });
  }

  hideAnimation() {
    this.dialogRef.close();
  }

  changeAnimationData(title, description) {
    if (this.dialogRef) {
      this.dialogRef.componentInstance.data = {
        title,
        description,
      };
    } else {
      this.showAnimation(title, description);
    }
  }

  ngOnDestroy(): void {}
}
