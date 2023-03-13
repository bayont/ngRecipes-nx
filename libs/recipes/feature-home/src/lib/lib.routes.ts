import { Route } from '@angular/router';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';

export const recipesFeatureHomeRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: RecipesHomeComponent },
];
