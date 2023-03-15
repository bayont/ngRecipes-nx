import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { AuthorDetailsDialogService } from './author-details-dialog.service';

describe('AuthorDetailsDialogService', () => {
  let service: AuthorDetailsDialogService;
  const mockMatDialog = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    open: () => {},
  };
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: mockMatDialog }],
    });
    service = TestBed.inject(AuthorDetailsDialogService);
    matDialog = TestBed.inject(MatDialog);
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
