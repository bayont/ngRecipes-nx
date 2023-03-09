import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  actionDeleteRecipe,
  Recipe,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { Store } from '@ngrx/store';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDeleteDialogService {
  constructor(
    private readonly store: Store,
    private readonly matDialog: MatDialog
  ) {}

  public askForRecipeDelete(recipe: Recipe) {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent, {
      data: recipe,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(actionDeleteRecipe({ recipeId: recipe._id }));
      }
    });
  }
}
