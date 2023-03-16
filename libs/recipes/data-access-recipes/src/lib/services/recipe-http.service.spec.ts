import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Recipe } from '../models';

import { RecipeHttpService } from './recipe-http.service';

describe('RecipeHttpService', () => {
  let service: RecipeHttpService;
  const mockHttpClient = {
    get: jest.fn(() => of()),
    post: jest.fn(() => of()),
    put: jest.fn(() => of()),
    delete: jest.fn(() => of()),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    });
    service = TestBed.inject(RecipeHttpService);
    jest.clearAllMocks();
  });

  describe('.fetchRecipes()', () => {
    it('should call http.get with proper recipe endpoint', () => {
      service.fetchRecipes();
      expect(mockHttpClient.get).toBeCalledWith(
        expect.stringMatching(/https:\/\/crudcrud.com\/api\//)
      );
    });
  });

  describe('.fetchRecipe(recipeId)', () => {
    const recipeId = 'randomId';
    it('should call http.get with specific recipeId', () => {
      service.fetchRecipe(recipeId);
      expect(mockHttpClient.get).toBeCalledWith(
        expect.stringMatching(
          new RegExp(`https://crudcrud.com/api/.+/${recipeId}`)
        )
      );
    });
  });

  describe('.updateRecipe(recipe)', () => {
    const recipe: Recipe = {
      _id: 'pizza1',
      name: 'Updated Pizza',
      description: 'description',
      ingredients: [],
      preparationTimeInMinutes: 30,
    };

    it('should call http.put with given recipe as body', () => {
      service.updateRecipe(recipe);
      const { _id, ...recipeWithStrippedId } = recipe;
      expect(mockHttpClient.put).toBeCalledWith(
        expect.stringMatching(new RegExp(`https://crudcrud.com/api/.+/${_id}`)),
        recipeWithStrippedId,
        { observe: 'response' }
      );
    });
  });

  describe('.createRecipe(recipe)', () => {
    const recipe: Omit<Recipe, '_id'> = {
      name: 'Pizza',
      description: 'description',
      ingredients: [],
      preparationTimeInMinutes: 30,
    };

    it('should call http.post with given recipe as body', () => {
      service.createRecipe(recipe);
      expect(mockHttpClient.post).toBeCalledWith(
        expect.stringMatching(/https:\/\/crudcrud.com\/api\//),
        recipe
      );
    });
  });
});
