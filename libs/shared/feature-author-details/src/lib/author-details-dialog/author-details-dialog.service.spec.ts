import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { AuthorDetailsDialogService } from './author-details-dialog.service';

describe('AuthorDetailsDialogService', () => {
  const createService = createServiceFactory(AuthorDetailsDialogService);

  const testSetup = () => {
    const spectator = createService({
      providers: [MockProvider(MatDialog)],
    });
    const service = spectator.service;
    const matDialog = spectator.inject(MatDialog);

    return { spectator, service, matDialog };
  };

  it('should be created', () => {
    const { service } = testSetup();
    expect(service).toBeTruthy();
  });

  it('should open the dialog', () => {
    const { service, matDialog } = testSetup();
    jest.spyOn(matDialog, 'open');
    service.openDialog();
    expect(matDialog.open).toHaveBeenCalled();
  });
});
