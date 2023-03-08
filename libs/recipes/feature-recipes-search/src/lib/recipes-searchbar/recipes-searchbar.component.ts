import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, Subject, takeUntil } from 'rxjs';
import { SearchRecipesService } from '../search-recipes.service';

@Component({
  selector: 'ngrecipes-nx-recipes-searchbar',
  templateUrl: './recipes-searchbar.component.html',
  styleUrls: ['./recipes-searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesSearchbarComponent implements OnInit, OnDestroy {
  public searchBar = new FormControl('');
  private destructor = new Subject<boolean>();

  constructor(private searchRecipesService: SearchRecipesService) {}

  ngOnInit(): void {
    this.searchBar.valueChanges
      .pipe(takeUntil(this.destructor), startWith(''))
      .subscribe((searchValue) => {
        if (searchValue !== null)
          this.searchRecipesService.searchForRecipes(searchValue);
      });
  }

  ngOnDestroy(): void {
    this.destructor.next(false);
    this.destructor.complete();
  }
}
