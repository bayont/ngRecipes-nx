import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { recipesFeatureHomeRoutes } from './lib.routes';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(recipesFeatureHomeRoutes)],
  declarations: [RecipesHomeComponent],
})
export class RecipesFeatureHomeModule {}
