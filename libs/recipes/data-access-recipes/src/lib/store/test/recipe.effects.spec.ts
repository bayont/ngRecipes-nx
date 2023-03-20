import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MemoizedSelector } from '@ngrx/store';
import { RecipeListEffects } from '../recipe.effects';
import { RecipeHttpService } from '../../services';
import { recipesFixtures } from '../../test';
import { Recipe } from '../../models';
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
} from '../recipe.actions';
import { RecipeListState } from '../recipe.reducer';
import { selectRecipes } from '../recipe.select';

describe('Effect: Recipes', () => {
  let actions$: Observable<unknown>;
  let effects: RecipeListEffects;
  let store: MockStore;
  let recipeHttpService: RecipeHttpService;
  let router: Router;
  let mockRecipesSelector: MemoizedSelector<RecipeListState, Recipe[]>;

  const recipeFixture = recipesFixtures[0];
  const mockRecipeHttpService = {
    fetchRecipes: () => of(recipesFixtures),
    fetchRecipe: (recipeId: string) => of({ ...recipeFixture, _id: recipeId }),
    createRecipe: (recipe: Omit<Recipe, '_id'>) =>
      of({ ...recipe, _id: recipeFixture._id }),
    updateRecipe: (recipe: Recipe) =>
      recipe._id === recipeFixture._id ? of(recipe._id) : of(''),
    deleteRecipe: (recipeId: string) =>
      recipeId === recipeFixture._id ? of(recipeId) : of(''),
  };
  const mockRouter = {
    navigateByUrl: () => of(true),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RecipeListEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: RecipeHttpService, useValue: mockRecipeHttpService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    store = TestBed.inject(MockStore);
    effects = TestBed.inject(RecipeListEffects);
    recipeHttpService = TestBed.inject(RecipeHttpService);
    router = TestBed.inject(Router);
    mockRecipesSelector = store.overrideSelector(
      selectRecipes,
      recipesFixtures
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('.onFetchRecipes$', () => {
    beforeEach(() => {
      actions$ = of(actionFetchRecipes);
    });

    it('should fire on actionFetchRecipes', (done) => {
      effects.onFetchRecipes$.subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });

    it('should call recipeHttpService.fetchRecipes()', (done) => {
      jest.spyOn(recipeHttpService, 'fetchRecipes');
      effects.onFetchRecipes$.subscribe(() => {
        expect(recipeHttpService.fetchRecipes).toBeCalledTimes(1);
        done();
      });
    });

    it('should invoke setter action with fetched recipes', (done) => {
      effects.onFetchRecipes$.subscribe((res) => {
        expect(res).toEqual(
          actionSetFetchedRecipes({ recipes: recipesFixtures })
        );
        done();
      });
    });
  });

  describe('.onCreateRecipe$', () => {
    beforeEach(() => {
      actions$ = of(actionCreateRecipe({ recipe: recipeFixture }));
    });
    it('should fire on actionCreateRecipe', (done) => {
      effects.onCreateRecipe$.subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });

    it('should call recipeHttpService.createRecipe', (done) => {
      jest.spyOn(recipeHttpService, 'createRecipe');
      effects.onCreateRecipe$.subscribe(() => {
        expect(recipeHttpService.createRecipe).toBeCalledWith(recipeFixture);
        done();
      });
    });

    it('should call router.navigateByUrl with edit url', (done) => {
      jest.spyOn(router, 'navigateByUrl');
      effects.onCreateRecipe$.subscribe(() => {
        expect(router.navigateByUrl).toBeCalledWith(
          `/recipes/${recipeFixture._id}/edit`
        );
        done();
      });
    });

    it('should invoke action which add the created recipe', (done) => {
      effects.onCreateRecipe$.subscribe((res) => {
        expect(res).toEqual(actionAddCreatedRecipe({ recipe: recipeFixture }));
        done();
      });
    });
  });

  describe('.onCreateMockRecipe$', () => {
    beforeEach(() => {
      actions$ = of(actionCreateMockRecipe);
    });

    it('should fire on actionCreateMockRecipe', (done) => {
      effects.onCreateMockRecipe$.subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });

    describe('check names assigning mechanism', () => {
      const MOCK_RECIPE: Omit<Recipe, '_id'> = {
        name: '',
        description:
          'Describe here step-by-step entire process of creating this meal...',
        preparationTimeInMinutes: 10,
        ingredients: [
          { _id: '1', name: 'Ingredient 1', quantity: '1' },
          { _id: '2', name: 'Ingredient 2', quantity: '3' },
        ],
      };
      describe('when other mocks do not exists', () => {
        it('should invoke create action', (done) => {
          mockRecipesSelector.setResult([]);
          const expectedName = 'New recipe';
          effects.onCreateMockRecipe$.subscribe((res) => {
            expect(res).toEqual(
              actionCreateRecipe({
                recipe: { ...MOCK_RECIPE, name: expectedName },
              })
            );
            done();
          });
        });
      });
      describe('when other recipe took `New recipe` name already', () => {
        it('should invoke create action', (done) => {
          mockRecipesSelector.setResult([
            { ...recipeFixture, name: 'New recipe' },
          ]);
          const expectedName = 'New recipe (2)';
          effects.onCreateMockRecipe$.subscribe((res) => {
            expect(res).toEqual(
              actionCreateRecipe({
                recipe: { ...MOCK_RECIPE, name: expectedName },
              })
            );
            done();
          });
        });
      });
    });
  });

  describe('.onUpdateRecipe$', () => {
    beforeEach(() => {
      actions$ = of(actionUpdateRecipe({ recipe: recipeFixture }));
    });

    it('should fire on actionUpdateRecipe', (done) => {
      effects.onUpdateRecipe$.subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });

    it('should call router.navigateByUrl to show updated recipe detail view', (done) => {
      jest.spyOn(router, 'navigateByUrl');
      effects.onUpdateRecipe$.subscribe(() => {
        expect(router.navigateByUrl).toBeCalledWith(
          `/recipes/${recipeFixture._id}`
        );
        done();
      });
    });

    it('should invoke action to update recipe in store', (done) => {
      effects.onUpdateRecipe$.subscribe((res) => {
        expect(res).toEqual(
          actionSetUpdatedRecipe({
            recipe: recipeFixture,
            recipeId: recipeFixture._id,
          })
        );
        done();
      });
    });
  });

  describe('.onDeleteRecipe$', () => {
    beforeEach(() => {
      actions$ = of(actionDeleteRecipe({ recipeId: recipeFixture._id }));
    });

    it('should fire on actionDeleteRecipe', (done) => {
      effects.onDeleteRecipe$.subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });
    });

    it('should call recipeHttpService.deleteRecipe', (done) => {
      jest.spyOn(recipeHttpService, 'deleteRecipe');
      effects.onDeleteRecipe$.subscribe(() => {
        expect(recipeHttpService.deleteRecipe).toBeCalledWith(
          recipeFixture._id
        );
        done();
      });
    });

    it('should invoke action to delete recipe from store', (done) => {
      effects.onDeleteRecipe$.subscribe((res) => {
        expect(res).toEqual(
          actionSetRemoveRecipe({ recipeId: recipeFixture._id })
        );
        done();
      });
    });
  });
});
