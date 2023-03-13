import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngrecipes-nx-recipes-home',
  templateUrl: './recipes-home.component.html',
  styleUrls: ['./recipes-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesHomeComponent {}
