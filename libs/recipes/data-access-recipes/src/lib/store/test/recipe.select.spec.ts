import { selectRecipes } from '../recipe.select';

describe('Selector: Recipes', () => {
  it('should return the recipes', () => {
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
    const result = selectRecipes.projector(recipes);
    expect(result).toEqual(recipes);
  });
});
