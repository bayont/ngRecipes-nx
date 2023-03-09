import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesSearchbarComponent } from './recipes-searchbar.component';

describe('RecipesSearchbarComponent', () => {
  let component: RecipesSearchbarComponent;
  let fixture: ComponentFixture<RecipesSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesSearchbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
