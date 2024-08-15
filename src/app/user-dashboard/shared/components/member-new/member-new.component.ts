import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { role } from '_models';

export interface NewMemberData {
  name: string;
  email: string;
  role: string;
  currentUserRole: string;
  edit?: boolean;
}

@Component({
  selector: 'app-member-new',
  templateUrl: './member-new.component.html',
  styleUrls: ['./member-new.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MemberNewComponent {
  newMemberForm: FormGroup;
  optionsRole = [];

  constructor(
    public dialogRef: MatDialogRef<MemberNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewMemberData,
    private formBuilder: FormBuilder
  ) {
    const roles = role.getAvailableRoles(data.currentUserRole);
    this.optionsRole = [];
    roles.forEach((roleName) =>
      this.optionsRole.push({ id: roleName, value: role.getStrRole(roleName) })
    );
    this.newMemberForm = this.formBuilder.group({
      name: [data.name, [Validators.required]],
      email: [data.email, [Validators.required]],
      role: [data.role, [Validators.required]],
    });
  }

  save() {
    this.dialogRef.close(this.newMemberForm.value);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
