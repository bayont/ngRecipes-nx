import { TestBed } from '@angular/core/testing';

import { AuthorDetailsDialogService } from './author-details-dialog.service';

describe('AuthorDetailsDialogService', () => {
  let service: AuthorDetailsDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorDetailsDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
