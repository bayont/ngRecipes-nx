import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { mockProvider, createComponentFactory } from '@ngneat/spectator/jest';
import { MockPipe } from 'ng-mocks';

import { TextStylePipe } from '@ngrecipes-nx/shared/util-text-style';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  const createComponent = createComponentFactory({
    component: ConfirmDialogComponent,
    imports: [MockPipe(TextStylePipe, (value) => value), MatDialogModule],
  });

  const testSetup = (options?: { title?: string; message?: string }) => {
    const spectator = createComponent({
      providers: [
        mockProvider(MatDialogRef),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: options?.title || 'Test title',
            message: options?.message || 'Test *content*',
          },
        },
      ],
    });
    const data = spectator.inject(MAT_DIALOG_DATA);
    const matDialogRef = spectator.inject(MatDialogRef);
    const matDialog = spectator.inject(MatDialog);
    const component = spectator.component;
    const loader = TestbedHarnessEnvironment.documentRootLoader(
      spectator.fixture
    );
    return { spectator, component, loader, data, matDialogRef, matDialog };
  };

  it('should create', () => {
    const { component } = testSetup();
    expect(component).toBeTruthy();
  });

  it('should close dialog and return true by clicking Yes button', async () => {
    const { component, loader, matDialogRef } = testSetup();
    jest.spyOn(component, 'onYes');
    jest.spyOn(matDialogRef, 'close');
    const buttonYes = await loader.getHarness(
      MatButtonHarness.with({ text: 'Yes' })
    );
    await buttonYes.click();
    expect(component.onYes).toBeCalled();
    expect(matDialogRef.close).toBeCalledWith(true);
  });

  it('should close dialog and return false by clicking No button', async () => {
    const { component, loader, matDialogRef } = testSetup();
    jest.spyOn(component, 'onNo');
    jest.spyOn(matDialogRef, 'close');
    const buttonNo = await loader.getHarness(
      MatButtonHarness.with({ text: 'No' })
    );
    await buttonNo.click();
    expect(component.onNo).toBeCalled();
    expect(matDialogRef.close).toBeCalledWith(false);
  });

  it('should display proper title', async () => {
    const { component, loader, data, matDialog } = testSetup();
    matDialog.open(ConfirmDialogComponent, { data });
    const dialog = await loader.getHarness(MatDialogHarness);
    expect(await dialog.getTitleText()).toBe(component.data.title);
  });

  it('should display proper content message', async () => {
    const { component, loader, data, matDialog } = testSetup();
    matDialog.open(ConfirmDialogComponent, { data });
    const dialog = await loader.getHarness(MatDialogHarness);
    expect(await dialog.getContentText()).toBe(component.data.message);
  });

  it('should display proper action buttons messages', async () => {
    const { loader, data, matDialog } = testSetup();
    matDialog.open(ConfirmDialogComponent, { data });
    const dialog = await loader.getHarness(MatDialogHarness);
    expect(await dialog.getActionsText()).toBe('Yes No');
  });
});
