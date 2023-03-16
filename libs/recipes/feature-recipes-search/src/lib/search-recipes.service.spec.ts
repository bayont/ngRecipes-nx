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

  it('should find all recipes when input is empty', (done) => {
    service.recipesSubject.subscribe((recipes) => {
      expect(recipes).toStrictEqual(recipesFixtures);
      done();
    });
    service.searchForRecipes('');
  });

  it('should find a recipe by name', (done) => {
    service.recipesSubject.subscribe((recipes) => {
      expect(recipes).toStrictEqual([recipeFixture]);
      done();
    });
    service.searchForRecipes(recipeFixture.name);
  });

  it('should find a recipe by ingredient name', (done) => {
    service.recipesSubject.subscribe((recipes) => {
      expect(recipes).toStrictEqual([recipeFixture]);
      done();
    });
    service.searchForRecipes(recipeFixture.ingredients[0].name);
  });

  it('should not find any recipes', (done) => {
    service.recipesSubject.subscribe((recipes) => {
      expect(recipes).toStrictEqual([]);
      done();
    });
    service.searchForRecipes('randomName');
  });
});
