import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeViewItemComponent } from './recipe-view-item/recipe-view-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { FormatTimePipe } from '@ngrecipes-nx/shared/util-format-time';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    FormatTimePipe,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: RecipeViewItemComponent },
    ]),
  ],
  declarations: [RecipeViewItemComponent],
})
export class RecipesFeatureRecipesViewItemModule {}
