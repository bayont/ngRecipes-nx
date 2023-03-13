import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecipesFeatureRecipesListModule } from '@ngrecipes-nx/recipes/feature-recipes-list';
import {
  HttpApiInterceptor,
  HttpErrorInterceptor,
  RecipeListEffects,
  recipesReducer,
  RECIPES_FEATURE_NAME,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { ContainerComponent } from './container/container.component';

export const routes: Routes = [
  {
    path: 'recipes-feature-home',
    loadChildren: () =>
      import('@ngrecipes-nx/recipes/feature-home').then(
        (m) => m.RecipesFeatureHomeModule
      ),
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: ':id/edit',
        loadChildren: () =>
          import('@ngrecipes-nx/recipes/feature-recipes-edit').then(
            (m) => m.RecipesFeatureRecipesEditModule
          ),
      },
      {
        path: ':id',
        loadChildren: () =>
          import('@ngrecipes-nx/recipes/feature-recipes-view-item').then(
            (m) => m.RecipesFeatureRecipesViewItemModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('@ngrecipes-nx/recipes/feature-home').then(
            (m) => m.RecipesFeatureHomeModule
          ),
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(RECIPES_FEATURE_NAME, recipesReducer),
    EffectsModule.forFeature([RecipeListEffects]),
    RecipesFeatureRecipesListModule,
    MatSnackBarModule,
  ],
  exports: [RouterModule],
  declarations: [ContainerComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true },
  ],
})
export class RecipesFeatureShellModule {}
