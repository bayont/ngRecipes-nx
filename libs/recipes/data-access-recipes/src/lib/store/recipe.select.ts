import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeListState } from './recipe.reducer';

export const RECIPES_FEATURE_NAME = 'recipes';

export const selectFeature = createFeatureSelector<RecipeListState>(RECIPES_FEATURE_NAME);

export const selectRecipes = createSelector(selectFeature, (state) => state);
