import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngrecipes-nx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { title: string; message: string },
    private readonly dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  public onYes(): void {
    this.dialogRef.close(true);
  }

  public onNo(): void {
    this.dialogRef.close(false);
  }
}
