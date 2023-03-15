import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideMockStore } from '@ngrx/store/testing';
import { SearchRecipesService } from '../search-recipes.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RecipesSearchbarComponent } from './recipes-searchbar.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecipesSearchbarComponent', () => {
  let component: RecipesSearchbarComponent;
  let fixture: ComponentFixture<RecipesSearchbarComponent>;
  let searchRecipesService: SearchRecipesService;
  let loader: HarnessLoader;

  const mockSearchRecipesService = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    searchForRecipes: () => {},
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [RecipesSearchbarComponent],
      providers: [
        provideMockStore(),
        { provide: SearchRecipesService, useValue: mockSearchRecipesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesSearchbarComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchRecipesService = TestBed.inject(SearchRecipesService);
  }));

  it('should search for all recipes on component init', () => {
    jest.spyOn(searchRecipesService, 'searchForRecipes');
    component.ngOnInit();
    expect(searchRecipesService.searchForRecipes).toBeCalledWith('');
  });

  it('should search for specific recipe on every input value change', async () => {
    jest.spyOn(searchRecipesService, 'searchForRecipes');
    component.searchBar.setValue('a');
    component.searchBar.setValue('b');
    component.searchBar.setValue('c');

    expect(searchRecipesService.searchForRecipes).toBeCalledWith('a');
    expect(searchRecipesService.searchForRecipes).toBeCalledWith('b');
    expect(searchRecipesService.searchForRecipes).toBeCalledWith('c');
  });
});
