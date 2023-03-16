import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {
  actionUpdateRecipe,
  Recipe,
  RecipeListState,
  recipesFixtures,
  selectRecipes,
} from '@ngrecipes-nx/recipes/data-access-recipes';
import { Subject } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';

import { RecipeEditComponent } from './recipe-edit.component';
import { FormBuilder } from '@angular/forms';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let store: MockStore;
  let mockSelectRecipes: MemoizedSelector<RecipeListState, Recipe[]>;
  let fb: FormBuilder;
  let router: Router;
  const recipeFixture = recipesFixtures[0];
  const mockRouter = {
    navigateByUrl: async () => true,
  };
  const routeParams = new Subject<{ id: string }>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      providers: [
        FormBuilder,
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: { params: routeParams.asObservable() },
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    mockSelectRecipes = store.overrideSelector(selectRecipes, recipesFixtures);
    fb = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    mockSelectRecipes.setResult(recipesFixtures);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('routing', () => {
    describe('onInit', () => {
      it('should not find any recipe and should navigate back', () => {
        jest.spyOn(router, 'navigateByUrl');
        routeParams.next({ id: 'not_found' });
        component.ngOnInit();
        expect(router.navigateByUrl).toBeCalledWith('/recipes');
      });
    });
  });

  describe('ingredients', () => {
    describe('.ingredientsArr', () => {
      it('should return ingredients array', () => {
        routeParams.next({ id: recipeFixture._id });
        jest.spyOn(component.editRecipeForm, 'get');
        component.ingredientsArr;
        expect(component.editRecipeForm.get).toBeCalledWith('ingredients');
      });
    });

    describe('.onAddNewIngredient()', () => {
      it('should add a new ingredient row', () => {
        routeParams.next({ id: recipeFixture._id });

        const ingredientsLengthBefore = component.ingredientsArr.length;
        component.onAddNewIngredient();
        const ingredientsLengthAfter = component.ingredientsArr.length;

        expect(ingredientsLengthAfter - ingredientsLengthBefore).toBe(1);
      });

      it('should ingredients source get updated on recipe add', () => {
        jest.spyOn(component.ingredientsSource, 'next');
        routeParams.next({ id: recipeFixture._id });
        component.onAddNewIngredient();
        expect(component.ingredientsSource.next).toBeCalledWith(
          component.ingredientsArr.controls
        );
      });
    });

    describe('.onDeleteIngredient(x)', () => {
      it('should remove recipe with given index', () => {
        routeParams.next({ id: recipeFixture._id });
        const ingredientsLengthBefore = component.ingredientsArr.length;
        component.onDeleteIngredient(0);
        const ingredientsLengthAfter = component.ingredientsArr.length;
        expect(ingredientsLengthBefore - ingredientsLengthAfter).toBe(1);
      });

      it('should ingredients source get updated on recipe removal', () => {
        jest.spyOn(component.ingredientsSource, 'next');
        routeParams.next({ id: recipeFixture._id });
        component.onDeleteIngredient(0);
        expect(component.ingredientsSource.next).toBeCalledWith(
          component.ingredientsArr.controls
        );
      });
    });
  });

  describe('form', () => {
    describe('onInit', () => {
      it('should find recipe and build form', () => {
        jest.spyOn(fb, 'group');
        routeParams.next({ id: recipeFixture._id });
        component.ngOnInit();
        expect(fb.group).toBeCalled();
      });
    });
    describe('onSubmit', () => {
      beforeEach(() => {
        jest.spyOn(store, 'dispatch');
        routeParams.next({ id: recipeFixture._id });
      });
      it('should update recipe on form submit', () => {
        component.editRecipeForm.setErrors(null);
        component.onSubmit();
        expect(store.dispatch).toBeCalledWith(
          actionUpdateRecipe({
            recipe: component.editRecipeForm.value as Recipe,
          })
        );
      });

      it('should not update recipe on form submit because of validation errors', () => {
        component.editRecipeForm.setErrors({ notValid: true });
        component.onSubmit();
        expect(store.dispatch).not.toBeCalled();
      });
    });
  });
});
