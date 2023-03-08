import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Recipe } from '@ngrecipes-nx/recipes/data-access-recipes';

@Component({
  selector: 'ngrecipes-nx-recipes-list-item',
  templateUrl: './recipes-list-item.component.html',
  styleUrls: ['./recipes-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListItemComponent {
  @Input() value: Recipe = {} as Recipe;
  @Output() deleteRecipe = new EventEmitter<Recipe>();

  public removeRecipe() {
    this.deleteRecipe.emit(this.value);
  }
}
