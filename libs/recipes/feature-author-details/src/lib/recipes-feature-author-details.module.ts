import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorDetailsDialogComponent } from './author-details-dialog/author-details-dialog.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [AuthorDetailsDialogComponent],
})
export class RecipesFeatureAuthorDetailsModule {}