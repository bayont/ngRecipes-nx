import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  actionCreateMockRecipe,
  actionDeleteRecipe,
  actionFetchRecipes,
  Recipe,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { SearchRecipesService } from '@ngrecipes-nx/recipes/feature-recipes-search';
import { ConfirmDialogService } from '@ngrecipes-nx/shared/feature-confirm-dialog';

@Component({
  selector: 'ngrecipes-nx-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements OnInit {
  public recipes$: Observable<Recipe[]> =
    this.searchRecipesService.recipesSubject.asObservable();

  constructor(
    private readonly store: Store,
    private readonly searchRecipesService: SearchRecipesService,
    private readonly confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(actionFetchRecipes());
  }

  public onAddNewRecipe(): void {
    this.store.dispatch(actionCreateMockRecipe());
  }

  public onDeleteRecipe(recipe: Recipe): void {
    this.confirmDialogService
      .ask(
        'Confirm recipe removal',
        `Do you really want to delete *${recipe.name}*?`
      )
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.deleteRecipe(recipe);
        }
      });
  }

  private deleteRecipe(recipe: Recipe) {
    this.store.dispatch(actionDeleteRecipe({ recipeId: recipe._id }));
  }
}
