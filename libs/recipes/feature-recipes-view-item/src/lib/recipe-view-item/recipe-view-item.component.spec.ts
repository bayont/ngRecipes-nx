import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeViewItemComponent } from './recipe-view-item.component';

describe('RecipeViewItemComponent', () => {
  let component: RecipeViewItemComponent;
  let fixture: ComponentFixture<RecipeViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeViewItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
