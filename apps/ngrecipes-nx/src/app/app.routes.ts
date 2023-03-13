import { Route } from '@angular/router';
export const appRoutes: Route[] = [
  {
    path: 'recipes',
    loadChildren: () =>
      import('@ngrecipes-nx/recipes/feature-shell').then(
        (m) => m.RecipesFeatureShellModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes',
  },
];
