import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListItemComponent } from './recipes-list-item/recipes-list-item.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  declarations: [RecipesListItemComponent],
  exports: [RecipesListItemComponent],
})
export class RecipesUiRecipesListItemModule {}
