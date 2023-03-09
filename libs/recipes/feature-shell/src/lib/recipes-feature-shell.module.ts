import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Routes } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FeatureNavbarModule } from '@ngrecipes-nx/feature-navbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './container/container.component';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const routes: Routes = [
  {
    path: 'recipes',
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
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes',
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    FeatureNavbarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreModule.forFeature(RECIPES_FEATURE_NAME, recipesReducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([RecipeListEffects]),
    StoreRouterConnectingModule.forRoot(),
    RecipesFeatureRecipesListModule,
    HttpClientModule,
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
