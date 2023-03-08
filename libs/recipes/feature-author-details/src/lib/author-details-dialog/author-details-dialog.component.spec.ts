import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailsDialogComponent } from './author-details-dialog.component';

describe('AuthorDetailsDialogComponent', () => {
  let component: AuthorDetailsDialogComponent;
  let fixture: ComponentFixture<AuthorDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorDetailsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
