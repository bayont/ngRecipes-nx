import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { Recipe } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RecipeHttpService {
  private readonly RECIPE_ENDPOINT = `https://crudcrud.com/api/59e8e54ce4ad410aa214ff4bcf854892/recipes`;

  constructor(private readonly http: HttpClient) {}

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.RECIPE_ENDPOINT);
  }

  public fetchRecipe(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.RECIPE_ENDPOINT}/${recipeId}`);
  }

  public createRecipe(recipe: Omit<Recipe, '_id'>): Observable<Recipe> {
    return this.http.post<Recipe>(this.RECIPE_ENDPOINT, recipe);
  }

  public updateRecipe(recipe: Recipe): Observable<string> {
    const { _id, ...recipeWithStrippedId } = recipe;
    return this.http
      .put(`${this.RECIPE_ENDPOINT}/${_id}`, recipeWithStrippedId, {
        observe: 'response',
      })
      .pipe(
        switchMap((response: HttpResponse<object>) => {
          return response.ok ? of(_id) : of('');
        })
      );
  }

  public deleteRecipe(recipeId: string): Observable<string> {
    return this.http
      .delete(`${this.RECIPE_ENDPOINT}/${recipeId}`, { observe: 'response' })
      .pipe(
        switchMap((response: HttpResponse<object>) => {
          return response.ok ? of(recipeId) : of('');
        })
      );
  }
}
