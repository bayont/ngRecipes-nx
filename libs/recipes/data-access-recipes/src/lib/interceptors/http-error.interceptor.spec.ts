import { TestBed } from '@angular/core/testing';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

describe('HttpErrorInterceptor', () => {
  let matSnackBar: MatSnackBar;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const mockMatSnackBar = {
    open: () => {
      return {} as MatSnackBarRef<TextOnlySnackBar>;
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    });
    matSnackBar = TestBed.inject(MatSnackBar);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should display matSnackBar when status code is 400', () => {
    jest.spyOn(matSnackBar, 'open');
    httpClient.get('/test').subscribe();
    const req = httpTestingController.expectOne('/test');
    req.flush('API key expired', {
      status: 400,
      statusText: 'API key expired',
    });
    httpTestingController.verify();

    expect(matSnackBar.open).toBeCalledWith(
      'CrudCrud API key expired',
      'CLOSE'
    );
  });
});
