import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeViewItemComponent } from './recipe-view-item.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  actionDeleteRecipe,
  Recipe,
  RecipeListState,
  recipesFixtures,
  selectRecipes,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { ConfirmDialogService } from '@ngrecipes-nx/shared/feature-confirm-dialog';
import { FormatTimePipe } from '@ngrecipes-nx/shared/util-format-time';
import { MemoizedSelector } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecipeViewItemComponent', () => {
  let component: RecipeViewItemComponent;
  let fixture: ComponentFixture<RecipeViewItemComponent>;
  let confirmDialogService: ConfirmDialogService;
  let store: MockStore;
  let mockRecipesSelector: MemoizedSelector<RecipeListState, Recipe[]>;
  let router: Router;
  let testScheduler: TestScheduler;
  const recipeFixture: Recipe = recipesFixtures[0];
  const mockRouter = {
    navigateByUrl: async () => true,
  };
  const activatedRoute = new BehaviorSubject<{ id: string }>({
    id: recipeFixture._id,
  });
  const mockActivatedRoute = {
    params: activatedRoute,
  };
  const userConfirmedRemoval = new BehaviorSubject<boolean>(true);
  const mockConfirmDialogService = {
    ask: () => {
      return userConfirmedRemoval.asObservable();
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormatTimePipe,
        MatTableModule,
        MatIconModule,
        RouterTestingModule,
      ],
      declarations: [RecipeViewItemComponent],
      providers: [
        provideMockStore({ initialState: { recipes: recipesFixtures } }),
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        { provide: Router, useValue: mockRouter },
        { provide: ConfirmDialogService, useValue: mockConfirmDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    confirmDialogService = TestBed.inject(ConfirmDialogService);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    mockRecipesSelector = store.overrideSelector(
      selectRecipes,
      recipesFixtures
    );
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign searched recipe to component member', () => {
    mockRecipesSelector.setResult(recipesFixtures);
    component.ngOnInit();

    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = 'a-';
      expectObservable(component.recipe$).toBe(expectedMarble, {
        a: recipeFixture,
      });
    });
  });

  it('should navigate back if recipe not found', () => {
    jest.spyOn(router, 'navigateByUrl');
    activatedRoute.next({ id: 'somethingNotExisting' });
    component.ngOnInit();
    expect(router.navigateByUrl).toBeCalledWith('/recipes');
  });

  it('should display confirm dialog', () => {
    jest.spyOn(confirmDialogService, 'ask');
    component.onDeleteRecipe(recipeFixture);
    expect(confirmDialogService.ask).toBeCalledWith(
      'Confirm recipe removal',
      `Do you really want to delete *${recipeFixture.name}*?`
    );
  });

  it('should remove recipe after being confirmed', () => {
    jest.spyOn(store, 'dispatch');
    component.onDeleteRecipe(recipeFixture);
    expect(store.dispatch).toBeCalledWith(
      actionDeleteRecipe({ recipeId: recipeFixture._id })
    );
  });

  it('should not remove recipe after confirmation dialog cancellation', () => {
    userConfirmedRemoval.next(false);
    jest.spyOn(store, 'dispatch');
    component.onDeleteRecipe(recipeFixture);
    expect(store.dispatch).not.toBeCalled();
  });
});
