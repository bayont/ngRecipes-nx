import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

import { ConfirmDialogService } from './confirm-dialog.service';

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;
  let matDialog: MatDialog;
  const mockMatDialog = {
    open: () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return { afterClosed: () => {} };
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: mockMatDialog }],
    });
    service = TestBed.inject(ConfirmDialogService);
    matDialog = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should ask for confimation', () => {
    jest.spyOn(matDialog, 'open');
    service.ask('Test title', 'Test *content*');

    expect(matDialog.open).toBeCalledWith(ConfirmDialogComponent, {
      data: { title: 'Test title', message: 'Test *content*' },
    });
  });
});
