import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailsDialogButtonComponent } from './author-details-dialog-button.component';

describe('AuthorDetailsDialogButtonComponent', () => {
  let component: AuthorDetailsDialogButtonComponent;
  let fixture: ComponentFixture<AuthorDetailsDialogButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorDetailsDialogButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorDetailsDialogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
