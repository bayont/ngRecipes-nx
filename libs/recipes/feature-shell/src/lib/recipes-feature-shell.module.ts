import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DefaultViewComponent } from '@ngrecipes-nx/recipes/ui-default-view';
import { RecipeEditComponent } from '@ngrecipes-nx/recipes/feature-recipes-edit';
import { RecipeViewItemComponent } from '@ngrecipes-nx/recipes/feature-recipes-view-item';
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
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
      { path: ':id', component: RecipeViewItemComponent },
      {
        path: '',
        component: DefaultViewComponent,
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
