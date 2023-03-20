import { waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { AuthorDetailsDialogComponent } from './author-details-dialog.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

describe('AuthorDetailsDialogComponent', () => {
  let spectator: Spectator<AuthorDetailsDialogComponent>;
  let matDialog: MatDialog;
  let loader: HarnessLoader;
  let dialogHarness: MatDialogHarness;
  const createComponent = createComponentFactory({
    component: AuthorDetailsDialogComponent,
    imports: [MatDialogModule],
  });

  beforeEach(waitForAsync(async () => {
    spectator = createComponent();

    loader = TestbedHarnessEnvironment.documentRootLoader(spectator.fixture);
    matDialog = spectator.inject(MatDialog);
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
