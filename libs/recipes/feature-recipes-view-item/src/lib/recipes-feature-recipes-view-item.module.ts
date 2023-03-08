import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeViewItemComponent } from './recipe-view-item/recipe-view-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RecipesFeatureFormatTimeModule } from '@ngrecipes-nx/recipes/feature-format-time';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    RecipesFeatureFormatTimeModule,
  ],
  declarations: [RecipeViewItemComponent],
  exports: [RecipeViewItemComponent],
})
export class RecipesFeatureRecipesViewItemModule {}
