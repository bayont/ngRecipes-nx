import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TextStylePipe } from '@ngrecipes-nx/shared/util-text-style';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, TextStylePipe],
  declarations: [ConfirmDialogComponent],
})
export class SharedFeatureConfirmDialogModule {}
