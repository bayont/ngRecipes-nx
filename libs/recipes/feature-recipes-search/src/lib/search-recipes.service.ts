import { Injectable } from '@angular/core';
import {
  Recipe,
  selectRecipes,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { Store } from '@ngrx/store';
import { of, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchRecipesService {
  constructor(private readonly store: Store) {}

  public recipesSubject: Subject<Recipe[]> = new Subject();

  public searchForRecipes(searchValue: string) {
    this.store
      .select(selectRecipes)
      .pipe(
        switchMap((recipes) => {
          if (!searchValue) {
            return of(recipes);
          }
          return of(
            recipes.filter((recipe) => {
              const regex = new RegExp(searchValue, 'i');
              for (const ingredient of recipe.ingredients) {
                if (regex.test(ingredient.name)) {
                  return true;
                }
              }
              return regex.test(recipe.name);
            })
          );
        })
      )
      .subscribe((recipes) => this.recipesSubject.next(recipes));
  }
}
