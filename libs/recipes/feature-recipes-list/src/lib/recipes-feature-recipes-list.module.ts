import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesUiRecipesListItemModule } from '@ngrecipes-nx/recipes/ui-recipes-list-item';
import { RecipesFeatureRecipesSearchModule } from '@ngrecipes-nx/recipes/feature-recipes-search';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RecipesUiRecipesListItemModule,
    RecipesFeatureRecipesSearchModule,
  ],
  declarations: [RecipesListComponent],
  exports: [RecipesListComponent],
})
export class RecipesFeatureRecipesListModule {}
