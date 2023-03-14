import { Recipe } from '../../models';

export const recipesFixtures: Recipe[] = [
  {
    _id: '1',
    name: 'New recipe',
    description:
      'Describe here step-by-step entire process of creating this meal...',
    preparationTimeInMinutes: 10,
    ingredients: [
      {
        _id: '1',
        name: 'Ingredient 1',
        quantity: '1',
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        quantity: '3',
      },
    ],
  },
];
