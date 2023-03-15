import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { recipesFixtures } from '@ngrecipes-nx/recipes/data-access-recipes';

import { RecipesListItemComponent } from './recipes-list-item.component';

describe('RecipesListItemComponent', () => {
  let component: RecipesListItemComponent;
  let fixture: ComponentFixture<RecipesListItemComponent>;
  const recipeFixture = recipesFixtures[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, RouterTestingModule],
      declarations: [RecipesListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete recipe event', () => {
    component.value = recipeFixture;
    jest.spyOn(component.deleteRecipe, 'emit');
    component.onDeleteRecipe();
    expect(component.deleteRecipe.emit).toBeCalledWith(recipeFixture);
  });
});
