import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [ConfirmDeleteDialogComponent],
  exports: [ConfirmDeleteDialogComponent],
})
export class RecipesFeatureConfirmDeleteDialogModule {}
