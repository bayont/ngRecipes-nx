import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { AuthorDetailsDialogComponent } from './author-details-dialog.component';
import { HarnessLoader } from '@angular/cdk/testing';

describe('AuthorDetailsDialogComponent', () => {
  let component: AuthorDetailsDialogComponent;
  let fixture: ComponentFixture<AuthorDetailsDialogComponent>;
  let matDialog: MatDialog;
  let loader: HarnessLoader;
  let dialogHarness: MatDialogHarness;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [AuthorDetailsDialogComponent],
      providers: [MatDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorDetailsDialogComponent);
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    matDialog = TestBed.inject(MatDialog);
    matDialog.open(AuthorDetailsDialogComponent);
    dialogHarness = await loader.getHarness(MatDialogHarness);
  }));

  it('should have proper title', async () => {
    expect(await dialogHarness.getTitleText()).toBe('Author details');
  });

  it('should have proper action button', async () => {
    expect(await dialogHarness.getActionsText()).toBe('Dismiss');
  });
});
