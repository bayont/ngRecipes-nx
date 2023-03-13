import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { AuthorDetailsDialogButtonComponent } from './author-details-dialog-button.component';
import { AuthorDetailsDialogService } from '../author-details-dialog/author-details-dialog.service';

describe('AuthorDetailsDialogButtonComponent', () => {
  let component: AuthorDetailsDialogButtonComponent;
  let fixture: ComponentFixture<AuthorDetailsDialogButtonComponent>;
  let loader: HarnessLoader;
  const mockAuthorDetailsDialogService = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    openDialog: () => {},
  };
  let authorDetailsDialogService: AuthorDetailsDialogService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorDetailsDialogButtonComponent],
      providers: [
        {
          provide: AuthorDetailsDialogService,
          useValue: mockAuthorDetailsDialogService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorDetailsDialogButtonComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    authorDetailsDialogService = TestBed.inject(AuthorDetailsDialogService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', async () => {
    jest.spyOn(authorDetailsDialogService, 'openDialog');
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    expect(authorDetailsDialogService.openDialog).toHaveBeenCalled();
  });
});
