import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesSearchbarComponent } from './recipes-searchbar/recipes-searchbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [RecipesSearchbarComponent],
  exports: [RecipesSearchbarComponent],
})
export class RecipesFeatureRecipesSearchModule {}
