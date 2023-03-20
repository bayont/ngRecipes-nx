import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  RecipeListEffects,
  recipesReducer,
  RECIPES_FEATURE_NAME,
} from './store';

@NgModule({
  imports: [
    StoreModule.forFeature(RECIPES_FEATURE_NAME, recipesReducer),
    EffectsModule.forFeature([RecipeListEffects]),
  ],
  providers: [],
})
export class RecipesDataAccessRecipesModule {}
