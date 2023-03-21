import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { AuthorDetailsDialogButtonComponent } from './author-details-dialog-button.component';
import { AuthorDetailsDialogService } from '../author-details-dialog/author-details-dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { createComponentFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

describe('AuthorDetailsDialogButtonComponent', () => {
  const createComponent = createComponentFactory({
    component: AuthorDetailsDialogButtonComponent,
    imports: [MatIconModule, MatButtonModule],
  });

  const testSetup = () => {
    const spectator = createComponent({
      providers: [MockProvider(AuthorDetailsDialogService)],
    });
    const component = spectator.component;
    const loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    const authorDetailsDialogService = spectator.inject(
      AuthorDetailsDialogService
    );

    return { spectator, component, loader, authorDetailsDialogService };
  };

  it('should create', () => {
    const { spectator } = testSetup();
    expect(spectator.component).toBeTruthy();
  });

  it('should open dialog', async () => {
    const { loader, authorDetailsDialogService } = testSetup();
    jest.spyOn(authorDetailsDialogService, 'openDialog');
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    expect(authorDetailsDialogService.openDialog).toHaveBeenCalled();
  });
});
