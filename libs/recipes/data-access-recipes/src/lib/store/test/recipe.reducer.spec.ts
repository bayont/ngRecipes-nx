import { Recipe } from '../../models';
import {
  actionSetRemoveRecipe,
  actionSetUpdatedRecipe,
} from '../recipe.actions';
import { recipesReducer } from '../recipe.reducer';

describe('Reducer: Recipes', () => {
  it('should return the initial state of empty array', () => {
    const action = {} as any;
    const state = recipesReducer(undefined, action);
    expect(state).toEqual([]);
  });
  it('should return the state with fetched recipes', () => {
    const initialState: Recipe[] = [];
    const recipes = [
      {
        _id: '1',
        name: 'Recipe 1',
        description: 'Description 1',
        preparationTimeInMinutes: 10,
        ingredients: [],
      },
      {
        _id: '2',
        name: 'Recipe 2',
        description: 'Description 2',
        preparationTimeInMinutes: 20,
        ingredients: [],
      },
    ];
    const action = {
      type: '[Recipe] Set fetched recipes',
      recipes,
    };
    const state = recipesReducer(initialState, action);
    expect(state).toEqual(recipes);
  });

  it('should return the state with added recipe', () => {
    const initialState: Recipe[] = [];
    const recipe = {
      _id: '1',
      name: 'Recipe 1',
      description: 'Description 1',
      preparationTimeInMinutes: 10,
      ingredients: [],
    };
    const action = {
      type: '[Recipe] Add created recipe',
      recipe,
    };
    const state = recipesReducer(initialState, action);
    expect(state).toEqual([recipe]);
  });

  it('should return the state with updated recipe', () => {
    const initialState: Recipe[] = [
      {
        _id: '1',
        name: 'Recipe 1',
        description: 'Description 1',
        preparationTimeInMinutes: 10,
        ingredients: [],
      },
    ];
    const newRecipe = {
      _id: '1',
      name: 'Recipe 1',
      description: 'Description 1',
      preparationTimeInMinutes: 10,
      ingredients: [],
    };
    const action = actionSetUpdatedRecipe({ recipe: newRecipe, recipeId: '1' });
    const state = recipesReducer(initialState, action);
    expect(state).toEqual([newRecipe]);
  });

  it('should return the state with removed recipe', () => {
    const initialState: Recipe[] = [
      {
        _id: '1',
        name: 'Recipe 1',
        description: 'Description 1',
        preparationTimeInMinutes: 10,
        ingredients: [],
      },
    ];
    const action = actionSetRemoveRecipe({ recipeId: '1' });
    const state = recipesReducer(initialState, action);
    expect(state).toEqual([]);
  });
});
