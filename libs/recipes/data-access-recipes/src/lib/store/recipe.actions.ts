import { createAction, props } from '@ngrx/store';
import { Recipe } from '../models';

export const actionFetchRecipes = createAction('[Recipe] Fetch all recipes');

export const actionSetFetchedRecipes = createAction(
  '[Recipe] Set fetched recipes',
  props<{ recipes: Recipe[] }>()
);

export const actionDeleteRecipe = createAction(
  '[Recipe] Delete recipe',
  props<{ recipeId: string }>()
);

export const actionSetRemoveRecipe = createAction(
  '[Recipe] Remove recipe from store',
  props<{ recipeId: string }>()
);

export const actionUpdateRecipe = createAction(
  '[Recipe] Update recipe',
  props<{ recipe: Recipe }>()
);

export const actionSetUpdatedRecipe = createAction(
  '[Recipe] Set Updated recipe',
  props<{ recipe: Recipe; recipeId: string }>()
);

export const actionCreateRecipe = createAction(
  '[Recipe] Create recipe',
  props<{ recipe: Omit<Recipe, '_id'> }>()
);

export const actionCreateMockRecipe = createAction(
  '[Recipe] Create mock recipe'
);

export const actionAddCreatedRecipe = createAction(
  '[Recipe] Add created recipe',
  props<{ recipe: Recipe }>()
);
