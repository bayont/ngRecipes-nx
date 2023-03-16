import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipesListComponent } from './recipes-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  RecipesFeatureRecipesSearchModule,
  SearchRecipesService,
} from '@ngrecipes-nx/recipes/feature-recipes-search';
import { ConfirmDialogService } from '@ngrecipes-nx/shared/feature-confirm-dialog';
import {
  actionCreateMockRecipe,
  actionDeleteRecipe,
  actionFetchRecipes,
  Recipe,
  recipesFixtures,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { of, Subject } from 'rxjs';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { RecipesListItemComponent } from '../recipes-list-item/recipes-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ selector: 'ngrecipes-nx-recipes-list-item' })
class MockRecipesListItemComponent {
  @Input() value = {};
  @Output() deleteRecipe = new EventEmitter();
}

@Component({ selector: 'ngrecipes-nx-recipes-searchbar' })
class MockRecipesSearchbarComponent {}

describe('RecipesListComponent', () => {
  let component: RecipesListComponent;
  let fixture: ComponentFixture<RecipesListComponent>;
  let searchRecipesService: SearchRecipesService;
  let confirmDialogService: ConfirmDialogService;
  let store: MockStore;
  let loader: HarnessLoader;
  const recipeFixture = recipesFixtures[0];

  const mockSearchRecipesService = {
    recipesSubject: {
      asObservable: () => of(recipesFixtures),
    },
  };

  const userConfirmationResponse = new Subject<boolean>();
  const mockConfirmDialogService = {
    ask: () => userConfirmationResponse.asObservable(),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, MatListModule],
      declarations: [
        RecipesListComponent,
        MockRecipesListItemComponent,
        MockRecipesSearchbarComponent,
      ],
      providers: [
        provideMockStore(),
        { provide: SearchRecipesService, useValue: mockSearchRecipesService },
        { provide: ConfirmDialogService, useValue: mockConfirmDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchRecipesService = TestBed.inject(SearchRecipesService);
    confirmDialogService = TestBed.inject(ConfirmDialogService);
    store = TestBed.inject(MockStore);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign subject to search results when component class get initialized', () => {
    let expectedRecipes: Recipe[] = [];
    component.recipes$.subscribe((recipes) => {
      expectedRecipes = recipes;
    });
    expect(expectedRecipes).toBe(recipesFixtures);
  });

  it('should fetch recipes from store on component init', () => {
    jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toBeCalledWith(actionFetchRecipes());
  });

  it('should invoke onAddNewRecipe after clicking "Create new recipe" button', async () => {
    jest.spyOn(component, 'onAddNewRecipe');
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: /Create new recipe/ })
    );
    await button.click();
    expect(component.onAddNewRecipe).toBeCalled();
  });

  it('should add new recipe onAddNewRecipe invoked', () => {
    jest.spyOn(store, 'dispatch');
    component.onAddNewRecipe();
    expect(store.dispatch).toBeCalledWith(actionCreateMockRecipe());
  });

  it('should ask user to confirm recipe removal', () => {
    jest.spyOn(confirmDialogService, 'ask');
    component.onDeleteRecipe(recipeFixture);
    expect(confirmDialogService.ask).toBeCalledWith(
      'Confirm recipe removal',
      `Do you really want to delete *${recipeFixture.name}*?`
    );
  });

  it('should delete recipe if user confirmes it', () => {
    jest.spyOn(confirmDialogService, 'ask');
    jest.spyOn(store, 'dispatch');
    component.onDeleteRecipe(recipeFixture);
    userConfirmationResponse.next(true);
    expect(store.dispatch).toBeCalledWith(
      actionDeleteRecipe({ recipeId: recipeFixture._id })
    );
  });

  it('should not delete recipe if user dismiss confirmation dialog', () => {
    jest.spyOn(confirmDialogService, 'ask');
    jest.spyOn(store, 'dispatch');
    component.onDeleteRecipe(recipeFixture);
    userConfirmationResponse.next(false);
    expect(store.dispatch).not.toBeCalled();
  });
});
