import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  actionCreateMockRecipe,
  actionFetchRecipes,
  Recipe,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { SearchRecipesService } from '@ngrecipes-nx/recipes/feature-recipes-search';
import { ConfirmDeleteDialogService } from '@ngrecipes-nx/recipes/feature-confirm-delete-dialog';

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
    private readonly confirmDeleteDialog: ConfirmDeleteDialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(actionFetchRecipes());
  }

  public addNewRecipe(): void {
    this.store.dispatch(actionCreateMockRecipe());
  }

  public deleteRecipe(recipe: Recipe): void {
    this.confirmDeleteDialog.askForRecipeDelete(recipe);
  }
}
