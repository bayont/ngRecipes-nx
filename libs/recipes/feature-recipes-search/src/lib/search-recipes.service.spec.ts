import { TestBed } from '@angular/core/testing';

import { SearchRecipesService } from './search-recipes.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  Recipe,
  RecipeListState,
  recipesFixtures,
  selectRecipes,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { MemoizedSelector } from '@ngrx/store';

describe('SearchRecipesService', () => {
  let service: SearchRecipesService;
  let store: MockStore;
  let mockSelectRecipes: MemoizedSelector<RecipeListState, Recipe[]>;
  const recipeFixture: Recipe = recipesFixtures[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: recipesFixtures })],
    });
    service = TestBed.inject(SearchRecipesService);
    store = TestBed.inject(MockStore);
    mockSelectRecipes = store.overrideSelector(selectRecipes, recipesFixtures);
    mockSelectRecipes.setResult(recipesFixtures);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find all recipes when input is empty', () => {
    let expectedRecipes: Recipe[] = [];
    service.recipesSubject.subscribe((recipes) => {
      expectedRecipes = recipes;
    });
    service.searchForRecipes('');
    expect(expectedRecipes).toEqual(recipesFixtures);
  });

  it('should find a recipe by name', () => {
    let expectedRecipes: Recipe[] = [];
    service.recipesSubject.subscribe((recipes) => {
      expectedRecipes = recipes;
    });
    service.searchForRecipes(recipeFixture.name);
    expect(expectedRecipes).toEqual([recipeFixture]);
  });

  it('should find a recipe by ingredient name', () => {
    let expectedRecipes: Recipe[] = [];
    service.recipesSubject.subscribe((recipes) => {
      expectedRecipes = recipes;
    });
    service.searchForRecipes(recipeFixture.ingredients[0].name);
    expect(expectedRecipes).toStrictEqual([recipeFixture]);
  });

  it('should not find any recipes', () => {
    let expectedRecipes: Recipe[] = [];
    service.recipesSubject.subscribe((recipes) => {
      expectedRecipes = recipes;
    });
    service.searchForRecipes('randomName');
    expect(expectedRecipes).toStrictEqual([]);
  });
});
