import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../models';
import {
  actionAddCreatedRecipe,
  actionSetFetchedRecipes,
  actionSetRemoveRecipe,
  actionSetUpdatedRecipe,
} from './recipe.actions';

export type RecipeListState = Recipe[];

const initialState: Recipe[] = [];

export const recipesReducer = createReducer<Recipe[]>(
  initialState,
  on(actionSetFetchedRecipes, (state, { recipes }): Recipe[] => [...recipes]),
  on(actionSetRemoveRecipe, (state, { recipeId }) => {
    return state.filter((recipe) => recipe._id !== recipeId);
  }),
  on(actionAddCreatedRecipe, (state, { recipe }): Recipe[] => {
    return [...state, recipe];
  }),
  on(actionSetUpdatedRecipe, (state, { recipe, recipeId }) => {
    return state.map((item) =>
      item._id === recipeId ? { ...item, ...recipe } : item
    );
  })
);
