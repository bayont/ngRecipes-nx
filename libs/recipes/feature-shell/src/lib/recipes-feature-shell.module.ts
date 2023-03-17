import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { RecipesFeatureRecipesListModule } from '@ngrecipes-nx/recipes/feature-recipes-list';
import { ContainerComponent } from './container/container.component';
import { RecipesDataAccessRecipesModule } from '@ngrecipes-nx/recipes/data-access-recipes';

export const routes: Routes = [
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
    RecipesFeatureRecipesListModule,
    RecipesDataAccessRecipesModule,
  ],
  exports: [RouterModule],
  declarations: [ContainerComponent],
  providers: [],
})
export class RecipesFeatureShellModule {}
