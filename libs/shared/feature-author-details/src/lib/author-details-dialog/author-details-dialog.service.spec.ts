import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { AuthorDetailsDialogService } from './author-details-dialog.service';

describe('AuthorDetailsDialogService', () => {
  let spectator: SpectatorService<AuthorDetailsDialogService>;
  const createService = createServiceFactory(AuthorDetailsDialogService);
  let service: AuthorDetailsDialogService;
  let matDialog: MatDialog;

  beforeEach(() => {
    spectator = createService({
      providers: [MockProvider(MatDialog)],
    });

    spectator.inject(MatDialog);
    matDialog = TestBed.inject(MatDialog);
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the dialog', () => {
    jest.spyOn(matDialog, 'open');
    service.openDialog();
    expect(matDialog.open).toHaveBeenCalled();
  });
});
