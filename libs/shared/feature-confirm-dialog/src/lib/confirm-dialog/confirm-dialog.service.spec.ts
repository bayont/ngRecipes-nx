import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

import { ConfirmDialogService } from './confirm-dialog.service';
import { createServiceFactory } from '@ngneat/spectator';
import { mockProvider } from '@ngneat/spectator/jest';

describe('ConfirmDialogService', () => {
  const createService = createServiceFactory({
    service: ConfirmDialogService,
    mocks: [MatDialog],
  });

  const testSetup = (options?: { isDialogConfirmed: boolean }) => {
    const spectator = createService({
      providers: [
        mockProvider(MatDialog, {
          open: () => {
            return {
              afterClosed: () => of(options?.isDialogConfirmed || true),
            };
          },
        }),
      ],
    });
    const service = spectator.service;
    const matDialog = spectator.inject(MatDialog);
    return { service, matDialog };
  };

  it('should be created', () => {
    const { service } = testSetup();
    expect(service).toBeTruthy();
  });

  it('should ask for confimation', () => {
    const { service, matDialog } = testSetup();
    jest.spyOn(matDialog, 'open');
    service.ask('Test title', 'Test *content*');

    expect(matDialog.open).toBeCalledWith(ConfirmDialogComponent, {
      data: { title: 'Test title', message: 'Test *content*' },
    });
  });
});
