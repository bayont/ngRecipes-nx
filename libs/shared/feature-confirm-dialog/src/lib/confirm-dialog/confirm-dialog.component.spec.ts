import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textStyle',
  standalone: true,
})
class MockTextStylePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value;
  }
}

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let loader: HarnessLoader;
  let data: { title: string; message: string };
  let matDialogRef: MatDialogRef<ConfirmDialogComponent>;
  let matDialog: MatDialog;
  const mockMatDialogRef = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    close: (result: boolean) => {},
  };
  const matDialogDataFixture = {
    title: 'Test title',
    message: 'Test *content*',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockTextStylePipe, MatDialogModule],
      declarations: [ConfirmDialogComponent],
      providers: [
        MatDialog,
        {
          provide: MatDialogRef<ConfirmDialogComponent>,
          useValue: mockMatDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogDataFixture,
        },
      ],
    }).compileComponents();

    data = TestBed.inject(MAT_DIALOG_DATA);
    matDialogRef = TestBed.inject(MatDialogRef);
    matDialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should result true after clicking yes button', async () => {
    jest.spyOn(component, 'onYes');
    jest.spyOn(matDialogRef, 'close');
    const buttonYes = await loader.getHarness(
      MatButtonHarness.with({ text: 'Yes' })
    );
    await buttonYes.click();
    expect(component.onYes).toBeCalled();
    expect(matDialogRef.close).toBeCalledWith(true);
  });

  it('should result false after clicking no button', async () => {
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
    matDialog.open(ConfirmDialogComponent, { data });
    const dialog = await loader.getHarness(MatDialogHarness);
    expect(await dialog.getTitleText()).toBe(component.data.title);
  });

  it('should display proper content message', async () => {
    matDialog.open(ConfirmDialogComponent, { data });
    const dialog = await loader.getHarness(MatDialogHarness);
    expect(await dialog.getContentText()).toBe(component.data.message);
  });

  it('should display proper action buttons messages', async () => {
    matDialog.open(ConfirmDialogComponent, { data });
    const dialog = await loader.getHarness(MatDialogHarness);
    expect(await dialog.getActionsText()).toBe('Yes No');
  });
});
