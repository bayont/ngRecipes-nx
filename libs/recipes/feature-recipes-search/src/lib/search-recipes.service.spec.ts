import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchRecipesService } from './search-recipes.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  Recipe,
  RecipeListState,
  recipesFixtures,
  selectRecipes,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { MemoizedSelector } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';
import { skip } from 'rxjs';

describe('SearchRecipesService', () => {
  let service: SearchRecipesService;
  let store: MockStore;
  let mockSelectRecipes: MemoizedSelector<RecipeListState, Recipe[]>;
  let testScheduler: TestScheduler;
  const recipeFixture: Recipe = recipesFixtures[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: recipesFixtures })],
    });
    service = TestBed.inject(SearchRecipesService);
    store = TestBed.inject(MockStore);
    mockSelectRecipes = store.overrideSelector(selectRecipes, recipesFixtures);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find a recipe by name', () => {
    mockSelectRecipes.setResult(recipesFixtures);
    let expectedRecipes: Recipe[] = [];
    service.recipesSubject.subscribe((recipes) => {
      expectedRecipes = recipes;
    });
    service.searchForRecipes(recipeFixture.name);
    expect(expectedRecipes).toEqual([recipeFixture]);
  });

  it('should find a recipe by ingredient name', () => {
    service.searchForRecipes(recipeFixture.ingredients[0].name);
  });
});
