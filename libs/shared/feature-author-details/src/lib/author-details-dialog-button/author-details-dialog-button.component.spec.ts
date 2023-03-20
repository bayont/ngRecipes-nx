import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { AuthorDetailsDialogButtonComponent } from './author-details-dialog-button.component';
import { AuthorDetailsDialogService } from '../author-details-dialog/author-details-dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

describe('AuthorDetailsDialogButtonComponent', () => {
  let spectator: Spectator<AuthorDetailsDialogButtonComponent>;
  let loader: HarnessLoader;
  let authorDetailsDialogService: AuthorDetailsDialogService;
  const createComponent = createComponentFactory({
    component: AuthorDetailsDialogButtonComponent,
    imports: [MatIconModule, MatButtonModule],
  });

  beforeEach(waitForAsync(() => {
    spectator = createComponent({
      providers: [MockProvider(AuthorDetailsDialogService)],
    });

    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    authorDetailsDialogService = spectator.inject(AuthorDetailsDialogService);
  }));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should open dialog', async () => {
    jest.spyOn(authorDetailsDialogService, 'openDialog');
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    expect(authorDetailsDialogService.openDialog).toHaveBeenCalled();
  });
});
