import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesFeatureRecipesSearchModule } from '@ngrecipes-nx/recipes/feature-recipes-search';
import { RecipesListItemComponent } from './recipes-list-item/recipes-list-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RecipesFeatureRecipesSearchModule,
    RouterModule,
  ],
  declarations: [RecipesListComponent, RecipesListItemComponent],
  exports: [RecipesListComponent],
})
export class RecipesFeatureRecipesListModule {}
