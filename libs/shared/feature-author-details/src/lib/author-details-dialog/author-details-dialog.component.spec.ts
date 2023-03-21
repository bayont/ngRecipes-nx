import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { AuthorDetailsDialogComponent } from './author-details-dialog.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('AuthorDetailsDialogComponent', () => {
  const testSetup = () => {
    const spectator = createComponent();
    const component = spectator.component;
    const loader = TestbedHarnessEnvironment.documentRootLoader(
      spectator.fixture
    );
    const matDialog = spectator.inject(MatDialog);
    matDialog.open(AuthorDetailsDialogComponent);

    return { spectator, component, loader, matDialog };
  };

  const createComponent = createComponentFactory({
    component: AuthorDetailsDialogComponent,
    imports: [MatDialogModule],
  });

  it('should have proper title', async () => {
    const { loader } = testSetup();
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    expect(await dialogHarness.getTitleText()).toBe('Author details');
  });

  it('should have proper action button', async () => {
    const { loader } = testSetup();
    const dialogHarness = await loader.getHarness(MatDialogHarness);
    expect(await dialogHarness.getActionsText()).toBe('Dismiss');
  });
});
