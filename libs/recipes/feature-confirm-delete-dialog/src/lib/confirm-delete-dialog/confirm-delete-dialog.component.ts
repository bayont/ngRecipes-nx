import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '@ngrecipes-nx/recipes/data-access-recipes';

@Component({
  selector: 'ngrecipes-nx-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe,
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>
  ) {}

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

  public deleteRecipe(): void {
    this.dialogRef.close(true);
  }
}
