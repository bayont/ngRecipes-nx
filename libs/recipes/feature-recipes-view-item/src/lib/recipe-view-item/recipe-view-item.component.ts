import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Recipe,
  selectRecipes,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { ConfirmDeleteDialogService } from '@ngrecipes-nx/recipes/feature-confirm-delete-dialog';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'ngrecipes-nx-recipe-view-item',
  templateUrl: './recipe-view-item.component.html',
  styleUrls: ['./recipe-view-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeViewItemComponent implements OnInit, OnDestroy {
  private destructor: Subject<boolean> = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly router: Router,
    private readonly confirmDeleteDialog: ConfirmDeleteDialogService
  ) {}

  public recipe$!: Observable<Recipe | undefined>;

  ngOnDestroy() {
    this.destructor.next(true);
  }

  ngOnInit() {
    this.recipe$ = combineLatest([
      this.route.params,
      this.store.select(selectRecipes),
    ]).pipe(
      takeUntil(this.destructor),
      switchMap(([params, recipes]) => {
        const searchedRecipe = recipes.find(
          (recipe) => params['id'] === recipe._id
        );
        if (!searchedRecipe) {
          this.router.navigateByUrl('/recipes');
        }
        return of(searchedRecipe);
      })
    );
  }

  public deleteRecipe(recipe: Recipe): void {
    this.confirmDeleteDialog.askForRecipeDelete(recipe);
  }
}
