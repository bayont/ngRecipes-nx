import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  actionAddCreatedRecipe,
  actionCreateMockRecipe,
  actionCreateRecipe,
  actionDeleteRecipe,
  actionFetchRecipes,
  actionSetFetchedRecipes,
  actionSetRemoveRecipe,
  actionSetUpdatedRecipe,
  actionUpdateRecipe,
} from './recipe.actions';
import { combineLatest, map, of, repeat, switchMap, tap } from 'rxjs';
import { RecipeHttpService } from '../recipe-http.service';
import { Router } from '@angular/router';
import { Recipe } from '../models';
import { selectRecipes } from './recipe.select';

@Injectable()
export class RecipeListEffects {
  constructor(
    private readonly action$: Actions,
    private store: Store,
    private recipeHttpService: RecipeHttpService,
    private router: Router
  ) {}

  onFetchRecipes$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionFetchRecipes),
      switchMap(() => {
        return this.recipeHttpService.fetchRecipes();
      }),
      map((recipes) => actionSetFetchedRecipes({ recipes })),
      repeat()
    );
  });

  onCreateRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionCreateRecipe),
      switchMap(({ recipe }) => {
        return this.recipeHttpService.createRecipe(recipe);
      }),
      map((recipe) => {
        this.router.navigateByUrl(`/recipes/${recipe._id}/edit`);
        return actionAddCreatedRecipe({ recipe });
      }),
      repeat()
    );
  });

  onCreateMockRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionCreateMockRecipe),
      concatLatestFrom(() => this.store.select(selectRecipes)),
      map(([, recipes]) => {
        console.log(recipes);
        const namesTaken: string[] = recipes.map((recipe) => recipe.name);

        let recipeName = `New recipe`;
        let i = 2;

        while (namesTaken.includes(recipeName)) {
          recipeName = `New recipe (${i})`;
          i++;
        }

        const MOCK_RECIPE: Omit<Recipe, '_id'> = {
          name: recipeName,
          description:
            'Describe here step-by-step entire process of creating this meal...',
          preparationTimeInMinutes: 10,
          ingredients: [
            { _id: '1', name: 'Ingredient 1', quantity: '1' },
            { _id: '2', name: 'Ingredient 2', quantity: '3' },
          ],
        };

        return actionCreateRecipe({ recipe: MOCK_RECIPE });
      })
    );
  });

  onUpdateRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionUpdateRecipe),
      switchMap(({ recipe }) => {
        return combineLatest([
          this.recipeHttpService.updateRecipe(recipe),
          of(recipe),
        ]);
      }),
      map(([recipeId, recipe]) => {
        this.router.navigateByUrl(`/recipes/${recipeId}`);

        return actionSetUpdatedRecipe({ recipe, recipeId });
      })
    );
  });

  onDeleteRecipe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(actionDeleteRecipe),
      switchMap(({ recipeId }) => {
        return this.recipeHttpService.deleteRecipe(recipeId);
      }),
      tap(() => {
        this.router.navigateByUrl('/recipes');
      }),
      map((recipeId) => actionSetRemoveRecipe({ recipeId })),
      repeat()
    );
  });
}
