import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpApiInterceptor } from './http-api.interceptor';

describe('HttpApiInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpApiInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add header to every http request', () => {
    httpClient.get('/test').subscribe();

    const req = httpTestingController.expectOne('/test');
    req.flush('');
    httpTestingController.verify();
    expect(req.request.headers.get('X-Requested-With')).toEqual('HoA');
  });
});
