import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthorDetailsDialogComponent } from './author-details-dialog/author-details-dialog.component';
import { AuthorDetailsDialogButtonComponent } from './author-details-dialog-button/author-details-dialog-button.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  declarations: [
    AuthorDetailsDialogComponent,
    AuthorDetailsDialogButtonComponent,
  ],
  exports: [AuthorDetailsDialogButtonComponent],
})
export class SharedFeatureAuthorDetailsModule {}
